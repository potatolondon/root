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

  connectedCallback() {
    super.connectedCallback();
    this.filterNode.type = 'bandpass';
    this.filterNode.frequency.setValueAtTime(1000, audioCtx.currentTime);
    this.filterNode.gain.setValueAtTime(25, audioCtx.currentTime);
  }

  __oninput({ currentTarget }) {
    const { id, value, type } = currentTarget;

    if (id.includes('type')) {
      this.filterNode.type = value;
    }

    if (id.includes('frequency')) {
      const rangeInput = document.querySelector('#filter-frequency-range');
      const numberInput = document.querySelector('#filter-frequency-number');

      if (type === 'number') {
        rangeInput.value = Math.log(value * 80) * 7;
      } else {
        numberInput.value = Math.exp(parseInt(value, 10) / 10.4);
        this.filterNode.frequency.setValueAtTime(value, audioCtx.currentTime);
      }
    }
  }

  render() {
    return html`
      <label for="filter-type">Filter Type</label>
      <select id="filter-type" @input=${this.__oninput}>
        ${map(
          Object.entries(Filter.filterTypes),
          ([value, label]) => html`
            <option ?selected=${value === this.filterNode.type} value=${value}>
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
          value="1"
          id="filter-frequency-range"
          name="filter-frequency"
          min="0"
          max="127"
        />
        <input
          @input=${this.__oninput}
          type="number"
          value="1000"
          id="filter-frequency-number"
          name="filter-frequency"
          min="20"
          max="20000"
        />
      </div>
    `;
  }
}

window.customElements.define('wapp-filter', Filter);
