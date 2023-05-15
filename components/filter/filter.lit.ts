import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { AudioComponent, RootElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';

export class Filter extends RootElement implements AudioComponent {
  static filterTypes = {
    lowpass: 'Lowpass',
    highpass: 'Highpass',
    // bandpass: 'Bandpass',
    // lowshelf: 'Lowshelf',
    // peaking: 'Peaking',
    // notch: 'Notch',
  };

  defaults: BiquadFilterOptions = {
    frequency: 22_050,
    gain: 0,
    Q: 1,
    type: Object.keys(Filter.filterTypes)[0] as BiquadFilterType,
  };

  audioNode = new BiquadFilterNode(audioCtx, { ...this.defaults });

  @property({ type: Boolean })
  enabled: boolean = true;

  @property({ type: String })
  sendTo: string = '';

  @property({ type: String })
  recieveFrom: string = '';

  __onFrequencyChange({ currentTarget }: InputEvent) {
    if (currentTarget && 'valueAsNumber' in currentTarget) {
      this.audioNode.frequency.setValueAtTime(
        currentTarget.valueAsNumber as number,
        audioCtx.currentTime
      );
    }
  }

  __onQChange({ currentTarget }: InputEvent) {
    if (currentTarget && 'valueAsNumber' in currentTarget) {
      this.audioNode.Q.setValueAtTime(
        currentTarget.valueAsNumber as number,
        audioCtx.currentTime
      );
    }
  }

  __onTypeChange({ currentTarget }: InputEvent) {
    if (currentTarget && 'value' in currentTarget) {
      this.audioNode.type = currentTarget.value as BiquadFilterType;
    }
  }

  __onGainChange({ currentTarget }: InputEvent) {
    if (currentTarget && 'valueAsNumber' in currentTarget) {
      this.audioNode.gain.setValueAtTime(
        currentTarget.valueAsNumber as number,
        audioCtx.currentTime
      );
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
              Object.entries(Filter.filterTypes),
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
        </div>
      </div>
    `;
  }
}

window.customElements.define('root-filter', Filter);
