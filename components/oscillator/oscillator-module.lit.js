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
import { RootElement } from '../base.lit';
import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { property } from 'lit/decorators.js';
import { BaseOscillator } from '.';
import '../fader/fader.lit';
import '../display/display.lit';
import { audioCtx } from '../../lib/audioContext';
export class OscillatorModule extends RootElement {
  constructor() {
    super();
    this.enabled = true;
    this.sendTo = '';
    this.recieveFrom = '';
    this.oscillators = [];
    this.waveforms = BaseOscillator.waveforms;
  }
  connectedCallback() {
    super.connectedCallback();
    this.createOscillators();
  }
  createOscillators() {
    var _a;
    for (const waveform in this.waveforms) {
      const osc = new BaseOscillator();
      osc.waveform = waveform;
      (_a = osc.gainNode) == null
        ? void 0
        : _a.gain.setValueAtTime(0, audioCtx.currentTime);
      this.oscillators.push({
        osc,
        enabled: false,
      });
    }
  }
  toggleOscillator(event) {
    const checked = event.target.checked;
    const type = event.currentTarget.id.split('-')[0];
    if (checked) {
      this.oscillators.map(obj => {
        if (obj.osc.waveform === type) {
          obj.enabled = true;
        }
        return obj;
      });
    } else {
      this.oscillators.map(obj => {
        if (obj.osc.waveform === type) {
          obj.enabled = false;
        }
        return obj;
      });
    }
  }
  setGain(event) {
    var _a;
    const waveform = event.currentTarget.getAttribute('data-waveform');
    const value = parseFloat(event.target.value);
    for (const obj of this.oscillators) {
      if (obj.osc.waveform === waveform) {
        (_a = obj.osc.gainNode) == null
          ? void 0
          : _a.gain.setValueAtTime(value, audioCtx.currentTime);
      }
    }
  }
  getOscNodes(event) {
    const oscNodes = [];
    for (const obj of this.oscillators) {
      if (obj.enabled) {
        oscNodes.push(obj.osc.__onNoteOn(event));
      }
    }
    return oscNodes;
  }
  __onDetune(event) {
    for (const obj of this.oscillators) {
      if (obj.enabled) {
        obj.osc.__onDetune(event);
      }
    }
  }
  __onDetuneStop(event) {
    for (const obj of this.oscillators) {
      obj.osc.__onDetuneStop(event);
    }
  }
  render() {
    return html`
      <div class="root-osc-module">
        <h1 class="module__heading">Multi-wave Oscillator</h1>
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
                    <input
                      aria-labelledby="${value}-toggle"
                      type="checkbox"
                      id="${value}-osc-toggle"
                      @change="${this.toggleOscillator}"
                    />
                    <label id="${value}-toggle" for="${value}-osc-toggle">
                      <span class="hidden">${value}</span>
                      <root-display kind=${value}></root-display>
                    </label>
                  </div>
                `
              )}
            </div>
            <p class="module__subheading">Wave mix</p>
          </div>
          <div class="osc-module-control__single-wrapper">
            <div class="module-single-fader-display__no-toggle">
              <root-fader
                @input=${this.__onDetune}
                @mouseup=${this.__onDetuneStop}
                id="detune"
                min="-1"
              ></root-fader>
              <root-display kind="detune" .toggle=${false}></root-display>
            </div>
            <p class="module__subheading">Detune</p>
          </div>
        </div>
      </div>
    `;
  }
}
__decorateClass(
  [property({ type: String })],
  OscillatorModule.prototype,
  'sendTo',
  2
);
__decorateClass(
  [property({ type: String })],
  OscillatorModule.prototype,
  'recieveFrom',
  2
);
window.customElements.define('root-osc-module', OscillatorModule);
