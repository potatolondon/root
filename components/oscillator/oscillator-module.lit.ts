import { AudioComponent, RootElement } from 'components/base.lit';
import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { property } from 'lit/decorators.js';
import { BaseOscillator, NoteOnEvent } from '.';
import { Fader } from '../fader/fader.lit';
import { Display } from '../display/display.lit';
import { audioCtx } from 'lib/audioContext';

type OscillatorObject = {
  osc: BaseOscillator;
  enabled: boolean;
};

export class OscillatorModule extends RootElement implements AudioComponent {
  enabled = true;

  @property({ type: String })
  sendTo: string = '';

  @property({ type: String })
  recieveFrom: string = '';

  oscillators: OscillatorObject[] = [];
  waveforms: {};
  gainNode?: GainNode;

  constructor() {
    super();
    this.waveforms = BaseOscillator.waveforms;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.createOscillators();
  }

  createOscillators() {
    for (const waveform in this.waveforms) {
      const osc = new BaseOscillator();
      osc.waveform = waveform as keyof typeof BaseOscillator.waveforms;
      osc.gainNode?.gain.setValueAtTime(0, audioCtx.currentTime);
      this.oscillators.push({
        osc,
        enabled: false,
      });
    }
  }

  toggleOscillator(event: {
    target: HTMLInputElement;
    currentTarget: Display;
  }) {
    const checked = event.target.checked;
    if (checked) {
      this.oscillators.map(obj => {
        if (obj.osc.waveform === event.currentTarget.type) {
          obj.enabled = true;
        }
        return obj;
      });
    } else {
      this.oscillators.map(obj => {
        if (obj.osc.waveform === event.currentTarget.type) {
          obj.enabled = false;
        }
        return obj;
      });
    }
  }

  setGain(event: { currentTarget: Fader; target: HTMLInputElement }) {
    const waveform = event.currentTarget.getAttribute('data-waveform');
    const value = parseFloat(event.target.value);
    for (const obj of this.oscillators) {
      if (obj.osc.waveform === waveform) {
        obj.osc.gainNode?.gain.setValueAtTime(value, audioCtx.currentTime);
      }
    }
  }

  getOscNodes(event: NoteOnEvent) {
    const oscNodes = [];
    for (const obj of this.oscillators) {
      if (obj.enabled) {
        oscNodes.push(obj.osc.__onNoteOn(event));
      }
    }
    return oscNodes;
  }

  __onDetune(event: InputEvent) {
    for (const obj of this.oscillators) {
      if (obj.enabled) {
        obj.osc.__onDetune(event);
      }
    }
  }

  __onDetuneStop(event: MouseEvent) {
    for (const obj of this.oscillators) {
      obj.osc.__onDetuneStop(event);
    }
  }

  render() {
    return html`
      <div class="root-osc-module">
        <h1 class="module__heading">Osc Module</h1>
        <div class="osc-module__wrapper">
          <div>
            <div class="osc-module__control-sources">
              ${map(
                Object.entries(this.waveforms),
                ([value]) => html`
                  <div class="osc-module__control">
                    <root-fader
                      @input="${this.setGain}"
                      data-waveform="${value}"
                    ></root-fader>
                    <root-display
                      type=${value}
                      @change="${this.toggleOscillator}"
                    ></root-display>
                  </div>
                `
              )}
            </div>
            <p class="module__subheading">Wave mix</p>
          </div>
          <div class="osc-module-control__single-wrapper">
            <div class="osc-module__control-single">
              <root-fader
                @input=${this.__onDetune}
                @mouseup=${this.__onDetuneStop}
                id="detune"
                min="-1"
              ></root-fader>
              <root-display type="detune" .toggle=${false}></root-toggle>
            </div>
            <p class="module__subheading">Detune</p>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('root-osc-module', OscillatorModule);
