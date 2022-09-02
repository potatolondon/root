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

  waveform = 'sine';

  oscillatorNode;

  __oninput({ currentTarget }) {
    this.waveform = currentTarget.value;
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
      <label for="waveform">Osc waveform</label>
      <select id="waveform" @input=${this.__oninput}>
        ${map(
          Object.entries(Oscillator.waveforms),
          ([value, label]) => html`
            <option ?selected=${value === this.waveform} value=${value}>
              ${label}
            </option>
          `
        )}
      </select>
    `;
  }
}

window.customElements.define('wapp-osc', Oscillator);
