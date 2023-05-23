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
import { property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { RootElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';
const _Filter = class extends RootElement {
  constructor() {
    super(...arguments);
    this.defaults = {
      frequency: 22050,
      gain: 0,
      Q: 1,
      type: Object.keys(_Filter.filterTypes)[0],
    };
    this.audioNode = new BiquadFilterNode(audioCtx, { ...this.defaults });
    this.enabled = true;
    this.sendTo = '';
    this.recieveFrom = '';
  }
  __onFrequencyChange({ currentTarget }) {
    if (currentTarget && 'convertedValue' in currentTarget) {
      this.audioNode.frequency.setValueAtTime(
        currentTarget.convertedValue,
        audioCtx.currentTime
      );
    }
  }
  __onQChange({ currentTarget }) {
    if (currentTarget && 'valueAsNumber' in currentTarget) {
      this.audioNode.Q.setValueAtTime(
        currentTarget.valueAsNumber,
        audioCtx.currentTime
      );
    }
  }
  __onTypeChange({ currentTarget }) {
    if (currentTarget && 'value' in currentTarget) {
      this.audioNode.type = currentTarget.value;
    }
  }
  __onGainChange({ currentTarget }) {
    if (currentTarget && 'valueAsNumber' in currentTarget) {
      this.audioNode.gain.value = currentTarget.valueAsNumber;
    }
  }
  render() {
    return html`
      <div class="root-filter">
        <h1 class="module__heading">Filter Module</h1>

        <div class="filter__wrapper">
          <div>
            <root-fader
              @input="${this.__onFrequencyChange}"
              id="filter-frequency"
              name="filter-frequency"
              min="15"
              max="16000"
              value=${this.defaults.frequency}
              ?disabled=${!this.enabled}
              type="logarithmic"
            ></root-fader>
            <label class="module__subheading" for="filter-frequency"
              >Freq</label
            >
          </div>

          <div>
            <root-fader
              @input="${this.__onQChange}"
              id="filter-q"
              name="filter-q"
              min="0"
              max="10"
              value=${this.defaults.Q}
              ?disabled=${!this.enabled}
            ></root-fader>
            <label class="module__subheading" for="filter-q">Res</label>
          </div>

          <form class="root-filter__types">
            ${map(
              Object.entries(_Filter.filterTypes),
              ([value, key]) => html`
                <label for="filter-type-${value}" class="root-filter__type">
                  <input
                    @input=${this.__onTypeChange}
                    type="radio"
                    name="filter-type"
                    id="filter-type-${value}"
                    value="${value}"
                    ?checked=${value === this.defaults.type}
                  />
                  <span class="hidden">${key}</span>
                  <root-display kind=${value}></root-display>
                </label>
              `
            )}
            <label class="module__subheading">Mode</label>
          </form>

          <!--
        TODO: Filter boost/gain compensation implementation TBC!

          <div>
            <root-fader
              @input="${this.__onGainChange}"
              id="filter-gain"
              name="filter-gain"
              min="0"
              max="40"
              value=${this.defaults.gain}
              ?disabled=${!this.enabled}
            ></root-fader>
            <label class="module__subheading" for="filter-gain">Boost</label>
          </div>
        -->
        </div>
      </div>
    `;
  }
};
export let Filter = _Filter;
Filter.filterTypes = {
  lowpass: 'Lowpass',
  highpass: 'Highpass',
};
__decorateClass([property({ type: Boolean })], Filter.prototype, 'enabled', 2);
__decorateClass([property({ type: String })], Filter.prototype, 'sendTo', 2);
__decorateClass(
  [property({ type: String })],
  Filter.prototype,
  'recieveFrom',
  2
);
window.customElements.define('root-filter', Filter);
