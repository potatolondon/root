import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { WappElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';

export class Filter extends WappElement {
  static filterTypes = {
    lowpass: 'Lowpass',
    highpass: 'Highpass',
    bandpass: 'Bandpass',
    lowshelf: 'Lowshelf',
    peaking: 'Peaking',
    notch: 'Notch',
  };

  filterNode = audioCtx.createBiquadFilter();

  initialFrequency = 1000;

  @property({ type: Boolean })
  isFilterOn = false;

  connectedCallback() {
    super.connectedCallback();
    this.filterNode.type = 'bandpass';
    this.filterNode.frequency.setValueAtTime(
      this.initialFrequency,
      audioCtx.currentTime
    );
    this.filterNode.gain.value = 10;
  }

  toggleFilter() {
    this.isFilterOn = !this.isFilterOn;
    this.dispatchEvent(
      new CustomEvent('is-filter-on', {
        detail: {
          isFilterOn: this.isFilterOn,
        },
      })
    );
  }

  __onInput({ currentTarget }: InputEvent) {
    if (!this.isFilterOn) return;
    if (!(currentTarget instanceof HTMLInputElement)) return;

    const { id, value, type } = currentTarget;

    if (id.includes('type')) {
      this.filterNode.type = value as BiquadFilterType;
    }

    if (id.includes('gain')) {
      const val = parseInt(value, 10);
      this.filterNode.gain.setValueAtTime(val, audioCtx.currentTime);
    }

    if (id.includes('frequency')) {
      const rangeInput: HTMLInputElement | null = document.querySelector(
        '#filter-frequency-range'
      );
      const numberInput: HTMLInputElement | null = document.querySelector(
        '#filter-frequency-number'
      );
      const val = parseInt(value, 10);
      if (type === 'number' && rangeInput) {
        rangeInput.value = String(val);
        this.filterNode.frequency.setValueAtTime(val, audioCtx.currentTime);
      } else if (numberInput) {
        numberInput.value = String(value);
        this.filterNode.frequency.setValueAtTime(val, audioCtx.currentTime);
      }
    }
  }

  render() {
    return html`
      <div>
        <div>
          <input
            type="checkbox"
            id="filter-switch"
            name="filter-switch"
            @input=${this.toggleFilter}
          />
          <label for="filter-switch">Filter Switch</label>
        </div>
        <label for="filter-type">Filter Type</label>
        <select
          id="filter-type"
          @input=${this.__onInput}
          .disabled="${!this.isFilterOn}"
        >
          ${map(
            Object.entries(Filter.filterTypes),
            ([value, label]) => html`
              <option
                ?selected=${value === this.filterNode.type}
                value=${value}
              >
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
            .disabled="${!this.isFilterOn}"
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
            .disabled="${!this.isFilterOn}"
            aria-label="Filter frequency number input"
          />
        </div>
      </div>
    `;
  }
}

window.customElements.define('wapp-filter', Filter);
