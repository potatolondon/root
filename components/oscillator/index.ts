import { audioCtx } from '../../lib/audioContext';

export class Oscillator {
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
  test = 'hello';

  detune = 0;

  detuneAmount = 2;

  stickyPitchBend = false;

  waveform: keyof typeof Oscillator.waveforms = 'sine';

  oscillatorNode?: OscillatorNode;

  constructor() {
    this.__onWaveform = this.__onWaveform.bind(this);
    this.__onDetune = this.__onDetune.bind(this);
    this.__onDetuneAmount = this.__onDetuneAmount.bind(this);
    this.__onDetuneStop = this.__onDetuneStop.bind(this);
    this.__onStickyToggle = this.__onStickyToggle.bind(this);
  }

  __onWaveform(event: InputEvent) {
    if (!(event.currentTarget instanceof HTMLInputElement)) return;
    if (!Object.keys(Oscillator.waveforms).includes(event.currentTarget.value))
      return;
    this.waveform = event.currentTarget
      .value as keyof typeof Oscillator.waveforms;
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
    this.querySelector('#detune')?.dispatchEvent(new MouseEvent('mouseup'));
  }


  start(note: number) {
    if (this.activeNotes.has(note)) return;
    this.oscillatorNode = new OscillatorNode(audioCtx, {
      detune: this.detune,
      frequency: Oscillator.noteToFrequency(note),
      type: this.waveform,
    });
    this.oscillatorNode.start();
    this.activeNotes.set(note, this.oscillatorNode);
    this.oscillatorNode.onended = () => {
      this.oscillatorNode?.disconnect();
      this.activeNotes.delete(note);
    };
  }

  stop(note: number) {
    if (!this.activeNotes.has(note)) return;
    this.oscillatorNode = this.activeNotes.get(note);
    this.oscillatorNode?.stop();
  }
}