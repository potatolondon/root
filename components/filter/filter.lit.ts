import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { AudioComponent, RootElement } from '../base.lit';
import { BaseFilter } from './index';

export class Filter extends RootElement implements AudioComponent {
  __onFrequencyChange: (event: InputEvent) => void;
  __onQChange: (event: InputEvent) => void;
  __onTypeChange: (event: InputEvent) => void;
  __onGainChange: (event: InputEvent) => void;

  component: BaseFilter;
  defaults: BiquadFilterOptions;
  filterTypes: {};

  @property({ type: Boolean })
  enabled: boolean = true;

  @property({ type: String })
  sendTo: string = '';

  @property({ type: String })
  recieveFrom: string = '';

  constructor() {
    super();
    this.component = new BaseFilter();
    this.__onFrequencyChange = this.component.__onFrequencyChange;
    this.__onQChange = this.component.__onQChange;
    this.__onTypeChange = this.component.__onTypeChange;
    this.__onGainChange = this.component.__onGainChange;
    this.defaults = this.component.defaults;
    this.filterTypes = BaseFilter.filterTypes;
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
              Object.entries(this.filterTypes),
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
}

window.customElements.define('root-filter', Filter);
