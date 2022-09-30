import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { WappElement } from '../base.lit.js';
import { audioCtx } from '../../context/audioContext.js';

export class Oscillator extends WappElement {
  static noteToFrequency(note) {
    return 2 ** ((note - 69) / 12) * 440;
  }

  static waveforms = {
    sawtooth: 'Sawtooth',
    sine: 'Sine',
    square: 'Square',
    triangle: 'Triangle',
  };

  activeNotes = new Map();

  detune = 0;

  detuneAmount = 2;

  stickyPitchBend = false;

  /** @type {OscillatorType} */
  waveform = 'sine';

  oscillatorNode;

  __onWaveform({ currentTarget }) {
    this.waveform = currentTarget.value;
  }

  __onDetune(event) {
    this.detune = event.currentTarget.valueAsNumber * this.detuneAmount * 100;
    for (const oscillator of this.activeNotes.values()) {
      oscillator.detune.setValueAtTime(this.detune, audioCtx.currentTime);
    }
  }

  __onDetuneAmount(event) {
    this.detuneAmount = event.currentTarget.valueAsNumber;
  }

  __onDetuneStop(event) {
    if (this.stickyPitchBend) return;
    event.currentTarget.value = 0; // eslint-disable-line no-param-reassign
    this.detune = 0;
    for (const oscillator of this.activeNotes.values()) {
      oscillator.detune.setValueAtTime(this.detune, audioCtx.currentTime);
    }
  }

  __onStickyToggle(event) {
    this.stickyPitchBend = event.currentTarget.checked;
    this.querySelector('#detune').dispatchEvent(new MouseEvent('mouseup'));
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  start(note) {
    if (this.activeNotes.has(note)) return;
    this.oscillatorNode = new OscillatorNode(audioCtx, {
      detune: this.detune,
      frequency: Oscillator.noteToFrequency(note),
      type: this.waveform,
    });
    this.oscillatorNode.start();
    this.activeNotes.set(note, this.oscillatorNode);
    this.oscillatorNode.onended = () => {
      this.oscillatorNode.disconnect();
      this.activeNotes.delete(note);
    };
  }

  stop(note) {
    if (!this.activeNotes.has(note)) return;
    this.oscillatorNode = this.activeNotes.get(note);
    this.oscillatorNode.stop();
  }

  render() {
    return html`
      <div class="osc">
        <label for="detune">Pitch bend</label>
        <div class="osc-pitch-bend">
          <input
            @input=${this.__onDetune}
            @mouseup=${this.__onDetuneStop}
            id="detune"
            max="1"
            min="-1"
            step="any"
            type="range"
            value="0"
          />
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
