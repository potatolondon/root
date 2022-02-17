/* eslint-disable class-methods-use-this */
import { WappElement } from '../base.lit.js';

export class Synth extends WappElement {
  noteOn(note) {
    return note;
  }

  noteOff(note) {
    return note;
  }
}
window.customElements.define('wapp-synth', Synth);
