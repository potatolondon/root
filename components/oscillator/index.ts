import { audioCtx } from '../../lib/audioContext';

export type NoteOffEvent = CustomEvent<{ note: number }>;
export type NoteOnEvent = CustomEvent<{ note: number }>;

declare global {
  interface GlobalEventHandlersEventMap {
    noteOff: NoteOffEvent;
    noteOn: NoteOnEvent;
  }
}
export class BaseOscillator {
  static noteToFrequency(note: number) {
    return 2 ** ((note - 69) / 12) * 440;
  }

  static waveforms = {
    sawtooth: 'Sawtooth',
    sine: 'Sine',
    square: 'Square',
    triangle: 'Triangle',
  };

  activeNotes: Map<number, OscillatorNode> = new Map();

  detune = 0;

  detuneAmount = 2;

  stickyPitchBend = false;

  waveform: keyof typeof BaseOscillator.waveforms = 'sine';

  audioNode?: OscillatorNode;

  isNoteOn = false;

  sendTo = '';

  enabled = true;

  constructor() {
    this.__onWaveform = this.__onWaveform.bind(this);
    this.__onDetune = this.__onDetune.bind(this);
    this.__onDetuneAmount = this.__onDetuneAmount.bind(this);
    this.__onDetuneStop = this.__onDetuneStop.bind(this);
    this.__onStickyToggle = this.__onStickyToggle.bind(this);
    this.__onNoteOn = this.__onNoteOn.bind(this);
    this.__onNoteOff = this.__onNoteOff.bind(this);
    document.addEventListener('noteOff', this.__onNoteOff);
  }

  __onWaveform(event: InputEvent) {
    if (!(event.currentTarget instanceof HTMLSelectElement)) return;
    if (
      !Object.keys(BaseOscillator.waveforms).includes(event.currentTarget.value)
    )
      return;
    this.waveform = event.currentTarget
      .value as keyof typeof BaseOscillator.waveforms;
  }

  __onDetune(event: InputEvent) {
    if (!(event.currentTarget instanceof HTMLInputElement)) return;
    this.detune = event.currentTarget.valueAsNumber * this.detuneAmount * 100;
    for (const oscillator of this.activeNotes.values()) {
      oscillator.detune.setValueAtTime(this.detune, audioCtx.currentTime);
    }
  }

  __onDetuneAmount(event: InputEvent) {
    if (!(event.currentTarget instanceof HTMLInputElement)) return;
    this.detuneAmount = event.currentTarget.valueAsNumber;
  }

  __onDetuneStop(event: MouseEvent) {
    if (!(event.currentTarget instanceof HTMLInputElement)) return;
    if (this.stickyPitchBend) return;
    event.currentTarget.value = '0';
    this.detune = 0;
    for (const oscillator of this.activeNotes.values()) {
      oscillator.detune.setValueAtTime(this.detune, audioCtx.currentTime);
    }
  }

  __onStickyToggle(event: InputEvent) {
    if (!(event.currentTarget instanceof HTMLInputElement)) return;
    this.stickyPitchBend = event.currentTarget.checked;
    document.querySelector('#detune')?.dispatchEvent(new MouseEvent('mouseup'));
  }

  __onNoteOn(event: NoteOnEvent) {
    this.isNoteOn = true;
    this.start(event.detail.note);
    return this.audioNode;
  }

  __onNoteOff(event: NoteOffEvent) {
    this.isNoteOn = false;
    this.stop(event.detail.note);
  }

  //creates the osc and sets the audio Node
  start(note: number) {
    if (this.activeNotes.has(note)) return;
    this.audioNode = new OscillatorNode(audioCtx, {
      detune: this.detune,
      frequency: BaseOscillator.noteToFrequency(note),
      type: this.waveform,
    });
    this.audioNode.start();
    this.activeNotes.set(note, this.audioNode);
    this.audioNode.onended = () => {
      this.audioNode?.disconnect();
      this.activeNotes.delete(note);
    };
  }

  stop(note: number) {
    if (!this.activeNotes.has(note)) return;
    this.audioNode = this.activeNotes.get(note);
    this.audioNode?.stop();
  }
}
