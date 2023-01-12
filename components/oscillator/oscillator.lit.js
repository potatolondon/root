'use strict';
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result =
    kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i]))
      result =
        (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import '../fader/fader.lit';
import { property } from 'lit/decorators.js';
import { RootElement } from '../base.lit';
import { BaseOscillator } from './index';
export class Oscillator extends RootElement {
  constructor() {
    super();
    this.enabled = true;
    this.sendTo = '';
    this.recieveFrom = '';
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
  createInput(value) {
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
              >
                ${this.createInput(value)}
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
              @input=${this.__onStickyToggle}
              id="sticky"
              type="checkbox"
            />
            <label for="sticky"><root-display /></label>
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
__decorateClass(
  [property({ type: String })],
  Oscillator.prototype,
  'sendTo',
  2
);
__decorateClass(
  [property({ type: String })],
  Oscillator.prototype,
  'recieveFrom',
  2
);
window.customElements.define('root-osc', Oscillator);
