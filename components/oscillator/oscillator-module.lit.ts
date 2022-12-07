import { AudioComponent, RootElement } from 'components/base.lit';
import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { property } from 'lit/decorators.js';
import { BaseOscillator, NoteOnEvent } from '.';
import '../toggle/toggle.lit';

export class OscillatorModule extends RootElement implements AudioComponent {
  enabled = true;

  @property({ type: String })
  sendTo: string = '';

  @property({ type: String })
  recieveFrom: string = '';

  enabledOscillators: BaseOscillator[] = [];
  waveforms: {};

  constructor() {
    super();
    this.waveforms = BaseOscillator.waveforms;
  }

  enableOscillator(event: { target: HTMLInputElement }) {
    const checked = event.target.checked;
    if (checked) {
      const osc = new BaseOscillator();
      osc.waveform = event.target.id as keyof typeof BaseOscillator.waveforms;
      this.enabledOscillators.push(osc);
    } else {
      this.enabledOscillators = this.enabledOscillators.filter(osc => {
        return osc.waveform !== event.target.id;
      });
    }
  }

  getOscNodes(event: NoteOnEvent) {
    const oscNodes = [];
    for (const osc of this.enabledOscillators) {
      oscNodes.push(osc.__onNoteOn(event));
    }
    return oscNodes;
  }

  render() {
    return html`
      <div class="osc-module">
        ${map(
          Object.entries(this.waveforms),
          ([value, label]) => html`
            <root-toggle
              label=${label}
              id=${value}
              @change="${this.enableOscillator}"
            ></root-toggle>
          `
        )}
      </div>
    `;
  }
}

window.customElements.define('root-osc-module', OscillatorModule);
