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

  oscillators = new Map();

  waveform = 'sine';

  __oninput({ currentTarget }) {
    this.waveform = currentTarget.value;
  }

  start(note) {
    if (this.oscillators.has(note)) return;
    const oscillator = new OscillatorNode(audioCtx, {
      frequency: Oscillator.noteToFrequency(note),
      type: this.waveform,
    });
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    this.oscillators.set(note, oscillator);
    oscillator.onended = () => {
      oscillator.connect(audioCtx.destination);
      this.oscillators.delete(note);
    };
  }

  stop(note) {
    if (!this.oscillators.has(note)) return;
    const oscillator = this.oscillators.get(note);
    oscillator.stop();
  }

  render() {
    return html`
      <label for="waveform">Osc waveform</label>
      <select id="waveform" @input=${this.__oninput}>
        ${map(Object.entries(Oscillator.waveforms), ([value, label]) => html`
          <option ?selected=${value === this.waveform} value=${value}>
            ${label}
          </option>
        `)}
      </select>
    `;
  }
}

window.customElements.define('wapp-osc', Oscillator);
