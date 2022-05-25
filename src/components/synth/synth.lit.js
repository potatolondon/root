import { WappElement } from '../base.lit.js';
import '../oscillator/oscillator.lit.js';

export class Synth extends WappElement {
  constructor() {
    super();
    this.__onNoteOn = this.__onNoteOn.bind(this);
    this.__onNoteOff = this.__onNoteOff.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('noteOn', this.__onNoteOn);
    this.addEventListener('noteOff', this.__onNoteOff);
    this.oscillator = this.querySelector('wapp-osc');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('noteOn', this.__onNoteOn);
    this.removeEventListener('noteOff', this.__onNoteOff);
  }

  __onNoteOn(event) {
    this.oscillator.start(event.detail.note);
  }

  __onNoteOff(event) {
    this.oscillator.stop(event.detail.note);
  }
}

window.customElements.define('wapp-synth', Synth);
