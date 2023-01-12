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
    this.audioNode = audioCtx.createBiquadFilter();
    this.initialFrequency = 1e3;
    this.enabled = true;
    this.sendTo = '';
    this.recieveFrom = '';
  }
  connectedCallback() {
    super.connectedCallback();
    this.audioNode.type = 'bandpass';
    this.audioNode.frequency.setValueAtTime(
      this.initialFrequency,
      audioCtx.currentTime
    );
    this.audioNode.gain.value = 10;
  }
  toggleFilter() {
    this.enabled = !this.enabled;
  }
  __onInput({ currentTarget }) {
    if (!this.enabled) return;
    if (!(currentTarget instanceof HTMLInputElement)) return;
    const { id, value, type } = currentTarget;
    if (id.includes('type')) {
      this.audioNode.type = value;
    }
    if (id.includes('gain')) {
      const val = parseInt(value, 10);
      this.audioNode.gain.setValueAtTime(val, audioCtx.currentTime);
    }
    if (id.includes('frequency')) {
      const rangeInput = document.querySelector('#filter-frequency-range');
      const numberInput = document.querySelector('#filter-frequency-number');
      const val = parseInt(value, 10);
      if (type === 'number' && rangeInput) {
        rangeInput.value = String(val);
        this.audioNode.frequency.setValueAtTime(val, audioCtx.currentTime);
      } else if (numberInput) {
        numberInput.value = String(value);
        this.audioNode.frequency.setValueAtTime(val, audioCtx.currentTime);
      }
    }
  }
  render() {
    return html`
      <div class="root-filter">
        <div>
          <input
            type="checkbox"
            id="filter-switch"
            name="filter-switch"
            @input=${this.toggleFilter}
            checked
          />
          <label for="filter-switch">Filter Switch</label>
        </div>
        <label for="filter-type">Filter Type</label>
        <select
          id="filter-type"
          @input=${this.__onInput}
          ?disabled=${!this.enabled}
        >
          ${map(
            Object.entries(_Filter.filterTypes),
            ([value, label]) => html`
              <option ?selected=${value === this.audioNode.type} value=${value}>
                ${label}
              </option>
            `
          )}
        </select>
        <div>
          <label for="filter-frequency">Filter Frequency: </label>
          <input
            @input=${this.__onInput}
            type="range"
            .value=${this.initialFrequency}
            id="filter-frequency-range"
            name="filter-frequency"
            min="20"
            max="20000"
            ?disabled=${!this.enabled}
            aria-label="Filter frequency range"
          />
          <input
            @input=${this.__onInput}
            type="number"
            .value=${this.initialFrequency}
            id="filter-frequency-number"
            name="filter-frequency"
            min="20"
            max="20000"
            ?disabled=${!this.enabled}
            aria-label="Filter frequency number input"
          />
        </div>
      </div>
    `;
  }
};
export let Filter = _Filter;
Filter.filterTypes = {
  lowpass: 'Lowpass',
  highpass: 'Highpass',
  bandpass: 'Bandpass',
  lowshelf: 'Lowshelf',
  peaking: 'Peaking',
  notch: 'Notch',
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
