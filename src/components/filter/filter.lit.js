import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { WappElement } from '../base.lit.js';
import { audioCtx } from '../../context/audioContext.js';

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

  exponentValue = 7;

  dividingValue = 80.015;

  connectedCallback() {
    super.connectedCallback();
    this.filterNode.type = 'bandpass';
    this.filterNode.frequency.setValueAtTime(
      this.initialFrequency,
      audioCtx.currentTime
    );
    this.filterNode.gain.setValueAtTime(25, audioCtx.currentTime);
  }

  __oninput({ currentTarget }) {
    const { id, value, type } = currentTarget;

    if (id.includes('type')) {
      this.filterNode.type = value;
    }

    if (id.includes('gain')) {
      this.filterNode.gain.setValueAtTime(value, audioCtx.currentTime);
    }

    if (id.includes('frequency')) {
      const rangeInput = document.querySelector('#filter-frequency-range');
      const numberInput = document.querySelector('#filter-frequency-number');

      if (type === 'number') {
        rangeInput.value = this._numberToRange(value);
      } else {
        numberInput.value = Math.floor(
          Math.exp(parseInt(value, 10) / this.exponentValue) /
            this.dividingValue
        );
        this.filterNode.frequency.setValueAtTime(value, audioCtx.currentTime);
      }
    }
  }

  _numberToRange(value) {
    return Math.log(value * this.dividingValue) * this.exponentValue;
  }

  render() {
    return html`
      <div>
        <label for="filter-type">Filter Type</label>
        <select id="filter-type" @input=${this.__oninput}>
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
            @input=${this.__oninput}
            type="range"
            .value=${this._numberToRange(this.initialFrequency)}
            id="filter-frequency-range"
            name="filter-frequency"
            min="0"
            max="100"
          />
          <input
            @input=${this.__oninput}
            type="number"
            .value=${this.initialFrequency}
            id="filter-frequency-number"
            name="filter-frequency"
            min="20"
            max="20000"
          />
        </div>
      </div>
    `;
  }
}

window.customElements.define('wapp-filter', Filter);
