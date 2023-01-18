import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import '../fader/fader.lit';
import { property } from 'lit/decorators.js';
import { AudioComponent, RootElement } from '../base.lit';
import { BaseOscillator, NoteOnEvent } from './index';

export class Oscillator extends RootElement implements AudioComponent {
  private __onDetune: (event: InputEvent) => void;
  private __onDetuneStop: (event: MouseEvent) => void;
  __onDetuneAmount: (event: InputEvent) => void;
  __onNoteOn: (event: NoteOnEvent) => AudioNode | void;
  __onStickyToggle: (event: InputEvent) => void;
  __onWaveform: (event: InputEvent) => void;

  enabled = true;
  oscillator: BaseOscillator;
  waveform: string;
  waveforms: {};

  @property({ type: String })
  sendTo: string = '';

  @property({ type: String })
  recieveFrom: string = '';

  constructor() {
    super();
    this.oscillator = new BaseOscillator();
    this.__onDetune = this.oscillator.__onDetune;
    this.__onDetuneStop = this.oscillator.__onDetuneStop;
    this.__onStickyToggle = this.oscillator.__onStickyToggle;
    this.__onDetuneAmount = this.oscillator.__onDetuneAmount;
    this.__onWaveform = this.oscillator.__onWaveform;
    this.__onNoteOn = this.oscillator.__onNoteOn;
    this.waveforms = BaseOscillator.waveforms;
    this.waveform = this.oscillator.waveform;
  }

  createInput(value: string) {
    return value === this.waveform
      ? html`<input
          type="radio"
          name="osc-select"
          id="${value}-osc-select"
          checked
        />`
      : html`<input type="radio" name="osc-select" id="${value}-osc-select" />`;
  }

  render() {
    return html`
      <div class="root-osc">
        <div class="root-osc__wave-select">
          <form
            class="root-osc__wave-select-sources"
            @change=${this.__onWaveform}
          >
            ${map(
              Object.entries(this.waveforms),
              ([value]) => html` <label
                for="${value}-osc-select"
                class="root-osc__source"
                id="${value}-select"
              >
                ${this.createInput(value)}
                <span class="hidden">${value}</span>
                <root-display kind=${value}></root-display>
              </label>`
            )}
          </form>
          <p class="module__subheading">Wave Select</p>
        </div>
        <div class="osc-pitch-bend">
          <div
            class="osc-pitch-bend__fader module-single-fader-display__no-toggle"
          >
            <root-fader
              @input=${this.__onDetune}
              @mouseup=${this.__onDetuneStop}
              id="detune"
              min="-1"
            ></root-fader>
            <root-display kind="detune" .toggle=${false}></root-display>
          </div>
          <p class="module__subheading">Detune</p>
        </div>
        <div class="osc-pitch-bend__options">
          <div class="osc-pitch-bend__sticky">
            <input
              aria-labelledby="sticky-label"
              @input=${this.__onStickyToggle}
              id="sticky"
              type="checkbox"
            />
            <label id="sticky-label" for="sticky">
              <span class="hidden">Sticky</span>
              <root-display text="Sticky"/>
            </label>
          </div>
          <input
            aria-labelledby="detune-amount-label"
            @input=${this.__onDetuneAmount}
            id="detune-amount"
            class="osc-pitch-bend__amount"
            step="1"
            type="number"
            value="2"
          />
          <label id="detune-amount-label" for="detune-amount" class="hidden"
            >Pitch bend semitones</label
          >
        </div>
      </div>
    `;
  }
}

window.customElements.define('root-osc', Oscillator);
