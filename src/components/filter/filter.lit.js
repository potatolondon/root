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

  type = 'bandpass';

  filterNode = audioCtx.createBiquadFilter();

  __oninput({ currentTarget }) {
    this.type = currentTarget.value;
  }

  connectedCallback() {
    super.connectedCallback();
    this.filterNode.type = this.type;
  }

  render() {
    return html`
      <label for="filter-type">Filter Type</label>
      <select id="filter-type" @input=${this.__oninput}>
        ${map(
          Object.entries(Filter.filterTypes),
          ([value, label]) => html`
            <option ?selected=${value === this.type} value=${value}>
              ${label}
            </option>
          `
        )}
      </select>
    `;
  }
}

window.customElements.define('wapp-filter', Filter);
