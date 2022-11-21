import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { Fader } from '../fader/fader.lit';
import { WappElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';

export class Oscillator extends WappElement {
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

  waveform: keyof typeof Oscillator.waveforms = 'sine';

  oscillatorNode?: OscillatorNode;

  __onWaveform(event: InputEvent) {
    if (!(event.currentTarget instanceof HTMLInputElement)) return;
    if (!Object.keys(Oscillator.waveforms).includes(event.currentTarget.value))
      return;
    this.waveform = event.currentTarget
      .value as keyof typeof Oscillator.waveforms;
  }

  __onDetune(event: InputEvent) {
    if (!(event.currentTarget instanceof Fader)) return;
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

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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

  render() {
    return html`
      <div class="osc">
        <label for="detune">Pitch bend</label>
        <div class="osc-pitch-bend">
          <root-fader
            @input=${this.__onDetune}
            @mouseup=${this.__onDetuneStop}
            id="detune"
            min="-1"
          ></root-fader>
          <label for="sticky">Sticky?</label>
          <input @input=${this.__onStickyToggle} id="sticky" type="checkbox" />
        </div>
        <label for="detune-amount">Pitch bend semitones</label>
        <input
          @input=${this.__onDetuneAmount}
          id="detune-amount"
          step="1"
          type="number"
          value="2"
        />
        <label for="waveform">Osc waveform</label>
        <select id="waveform" @input=${this.__onWaveform}>
          ${map(
            Object.entries(Oscillator.waveforms),
            ([value, label]) => html`
              <option ?selected=${value === this.waveform} value=${value}>
                ${label}
              </option>
            `
          )}
        </select>
      </div>
    `;
  }
}

window.customElements.define('wapp-osc', Oscillator);
