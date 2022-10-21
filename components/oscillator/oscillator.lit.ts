import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { WappElement } from '../base.lit';
import { Oscillator as BaseOscillator } from './index';

export class Oscillator extends WappElement {
  oscillator: BaseOscillator;
  private __onDetune: (event: InputEvent) => void;
  private __onDetuneStop: (event: MouseEvent) => void;
  __onStickyToggle: (event: InputEvent) => void;
  __onDetuneAmount: (event: InputEvent) => void;
  __onWaveform: (event: InputEvent) => void;
  waveforms: {};
  waveform: string;

  constructor() {
    super();
    this.oscillator = new BaseOscillator();
    this.__onDetune = this.oscillator.__onDetune;
    this.__onDetuneStop = this.oscillator.__onDetuneStop;
    this.__onStickyToggle = this.oscillator.__onStickyToggle;
    this.__onDetuneAmount = this.oscillator.__onDetuneAmount;
    this.__onWaveform = this.oscillator.__onWaveform;
    this.waveforms = BaseOscillator.waveforms;
    this.waveform = this.oscillator.waveform;

  }
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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
            Object.entries(this.waveforms),
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
