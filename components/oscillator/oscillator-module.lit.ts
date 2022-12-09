import { AudioComponent, RootElement } from 'components/base.lit';
import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { property } from 'lit/decorators.js';
import { BaseOscillator, NoteOnEvent } from '.';
import { Fader } from '../fader/fader.lit';
import { Toggle } from '../toggle/toggle.lit';
import { audioCtx } from 'lib/audioContext';

interface OscillatorObject {
  osc: BaseOscillator; 
  enabled: boolean; 
}

export class OscillatorModule extends RootElement implements AudioComponent {
  enabled = true;

  @property({ type: String })
  sendTo: string = '';

  @property({ type: String })
  recieveFrom: string = '';

  oscillators:OscillatorObject[] = [];
  waveforms: {};
  gainNode?: GainNode

  constructor() {
    super();
    this.waveforms = BaseOscillator.waveforms;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.createOscillators()
  }

  createOscillators() {
    for (const waveform in this.waveforms) {
      const osc =  new BaseOscillator();
      osc.waveform = waveform as keyof typeof BaseOscillator.waveforms;
      this.oscillators.push({
        osc,
        enabled: false
      })
    }
  }

  enableOscillator(event: { target: HTMLInputElement, currentTarget: Toggle }) {
    const checked = event.target.checked;
    if (checked) {
      this.oscillators.map(obj => {
        if(obj.osc.waveform === event.currentTarget.type) {
          obj.enabled = true;
        }
        return obj;
      })
    } else {
      this.oscillators.map(obj => {
        if(obj.osc.waveform === event.currentTarget.type) {
          obj.enabled = false;
        }
        return obj;
      });
    }
  }

  setGain(event: { currentTarget: Fader, target: HTMLInputElement }) {
    const waveform = event.currentTarget.getAttribute('data-waveform');
    const value = parseFloat(event.target.value);
    for (const obj of this.oscillators) {
      if(obj.osc.waveform === waveform) {
          obj.osc.gainNode?.gain.setValueAtTime(value, audioCtx.currentTime);
        }
    }

  }

  getOscNodes(event: NoteOnEvent) {
    const oscNodes = [];
    for (const obj of this.oscillators) {
      if(obj.enabled) {
        oscNodes.push(obj.osc.__onNoteOn(event));
      }
    }
    return oscNodes;
  }

  render() {
    return html`
      <div class="osc-module">
        ${map(
          Object.entries(this.waveforms),
          ([value]) => html`
          <div>
            <root-fader @input="${this.setGain}" data-waveform="${value}"></root-fader>
            <root-toggle
              type=${value}
              @change="${this.enableOscillator}"
            ></root-toggle>
          </div>
          `
        )}
      </div>
    `;
  }
}

window.customElements.define('root-osc-module', OscillatorModule);
