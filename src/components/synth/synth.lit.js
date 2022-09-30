import { html } from 'lit';
import { WappElement } from '../base.lit.js';
import { audioCtx } from '../../context/audioContext.js';
import '../oscillator/oscillator.lit.js';
import '../filter/filter.lit.js';
import '../keyboard/keyboard.lit.js';
import '../user-input/user-input.lit.js';
import '../midi-input/midi-input.lit.js';

export class Synth extends WappElement {
  isNoteOn = false;

  oscNode;

  filterNode;

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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('noteOn', this.__onNoteOn);
    this.removeEventListener('noteOff', this.__onNoteOff);
  }

  firstUpdated() {
    this.oscillator = this.querySelector('wapp-osc');
    this.filter = this.querySelector('wapp-filter');
    this.filterNode = this.filter.filterNode;
    this.isFilterOn = this.filterNode.isFilterOn;
  }

  __connect() {
    if (this.isFilterOn) {
      this.oscNode.connect(this.filterNode);
      this.filterNode.connect(this.gain);
    } else {
      this.oscNode.connect(this.gain);
    }
  }

  __onNoteOn(event) {
    this.isNoteOn = true;
    this.oscillator.start(event.detail.note);
    this.oscNode = this.oscillator.oscillatorNode;
    this.__connect();
  }

  __onNoteOff(event) {
    this.isNoteOn = false;
    this.oscillator.stop(event.detail.note);
  }

  onFilterChange(e) {
    this.isFilterOn = e.detail.isFilterOn;
    if (this.isNoteOn) {
      if (this.isFilterOn) {
        this.oscNode.disconnect(this.gain);
      }
      this.__connect();
    }
  }

  render() {
    return html`
      <wapp-osc></wapp-osc>
      <wapp-filter @is-filter-on="${this.onFilterChange}"></wapp-filter>
      <wapp-keyboard></wapp-keyboard>
      <wapp-midi></wapp-midi>
    `;
  }
}

window.customElements.define('wapp-synth', Synth);
