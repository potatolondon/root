import { html } from 'lit';
import { WappElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';
import { Oscillator } from '../oscillator/oscillator.lit';
import { Filter } from '../filter/filter.lit';
import '../keyboard/keyboard.lit';
import '../user-input/user-input.lit';
import '../midi-input/midi-input.lit';

export type NoteOffEvent = CustomEvent<{ note: number }>;
export type NoteOnEvent = CustomEvent<{ note: number }>;

declare global {
  interface GlobalEventHandlersEventMap {
    noteOff: NoteOffEvent;
    noteOn: NoteOnEvent;
  }
}

export class Synth extends WappElement {
  isFilterOn = false;
  isNoteOn = false;

  filterNode?: BiquadFilterNode;
  gainNode?: GainNode;
  oscNode?: OscillatorNode;

  oscillator?: Oscillator | null;
  filter?: Filter | null;

  constructor() {
    super();
    this.__onNoteOn = this.__onNoteOn.bind(this);
    this.__onNoteOff = this.__onNoteOff.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('noteOn', this.__onNoteOn);
    this.addEventListener('noteOff', this.__onNoteOff);
    this.gainNode = new GainNode(audioCtx, { gain: 0.2 });
    this.gainNode.connect(audioCtx.destination);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('noteOn', this.__onNoteOn);
    this.removeEventListener('noteOff', this.__onNoteOff);
  }

  firstUpdated() {
    this.oscillator = this.querySelector('wapp-osc');
    this.filter = this.querySelector('wapp-filter');
    this.filterNode = this.filter?.filterNode;
    this.isFilterOn = Boolean(this.filter?.isFilterOn);
  }

  __connect() {
    if (!(this.filterNode && this.gainNode && this.oscNode)) return;
    if (this.isFilterOn) {
      this.oscNode.connect(this.filterNode);
      this.filterNode.connect(this.gainNode);
    } else {
      this.oscNode.connect(this.gainNode);
    }
  }

  __onNoteOn(event: NoteOnEvent) {
    this.isNoteOn = true;
    this.oscillator?.oscillator.start(event.detail.note);
    this.oscNode = this.oscillator?.oscillator.oscillatorNode;
    this.__connect();
  }

  __onNoteOff(event: NoteOffEvent) {
    this.isNoteOn = false;
    this.oscillator?.oscillator.stop(event.detail.note);
  }

  onFilterChange(e: CustomEvent) {
    this.isFilterOn = e.detail.isFilterOn;
    if (this.isNoteOn) {
      if (this.isFilterOn && this.gainNode) {
        this.oscNode?.disconnect(this.gainNode);
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
