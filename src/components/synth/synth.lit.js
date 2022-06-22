import { WappElement } from '../base.lit.js';
import { audioCtx } from '../../context/audioContext.js';
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
    this.gain = new GainNode(audioCtx, { gain: 0.2 });
    this.gain.connect(audioCtx.destination);
    this.oscillator = this.querySelector('wapp-osc');
    this.filter = this.querySelector('wapp-filter');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('noteOn', this.__onNoteOn);
    this.removeEventListener('noteOff', this.__onNoteOff);
  }

  __onNoteOn(event) {
    this.oscillator.start(event.detail.note);
    this.oscillator.oscillatorNode.connect(this.filter.filterNode);
    this.filter.filterNode.connect(this.gain);
  }

  __onNoteOff(event) {
    this.oscillator.stop(event.detail.note);
  }
}

window.customElements.define('wapp-synth', Synth);
