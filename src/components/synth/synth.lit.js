/* eslint-disable class-methods-use-this */
import { html } from 'lit';
import { WappElement } from '../base.lit.js';
import '../oscillator/oscillator.lit.js';

export class Synth extends WappElement {
  static get properties() {
    return {
      isNoteOn: { type: Boolean },
      noteFrequency: { type: Number },
    };
  }

  constructor() {
    super();
    this.isNoteOn = false;
    this.noteFrequency = undefined;
  }

  noteOn(note) {
    this.isNoteOn = true;
    this.noteFrequency = note;
  }

  noteOff(note) {
    this.isNoteOn = false;
    this.noteFrequency = note;
  }

  render() {
    return html`
      <wapp-osc
        .isNoteOn=${this.isNoteOn}
        .frequency=${this.noteFrequency}
      ></wapp-osc>
    `;
  }
}
window.customElements.define('wapp-synth', Synth);
