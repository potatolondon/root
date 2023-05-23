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
import { createRef, ref } from 'lit/directives/ref.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import { RootElement } from '../base.lit';
export const FaderFormulas = {
  goldenratio: (x, min, max) => ((x - min) / (max - min)) ** (1 / 5 ** 0.5),
  linear: x => x,
  logarithmic: (x, min, max) => min * Math.E ** (Math.log(max / min) * x),
};
export class Fader extends RootElement {
  constructor() {
    super(...arguments);
    this.max = 1;
    this.min = 0;
    this.initialType = 'linear';
    this.initialValue = 0;
    this.formula = FaderFormulas.linear;
    this.input = createRef();
    this.convertedValue = this.initialValue;
  }
  get parentAttributes() {
    const attrs = {};
    const exclude = ['id', 'max', 'min', 'style', 'type', 'value'];
    for (const name of this.getAttributeNames()) {
      if (!exclude.includes(name)) {
        attrs[name] = this.getAttribute(name);
      }
    }
    return attrs;
  }
  get normalisedValue() {
    const value = Number.isNaN(this.valueAsNumber)
      ? this.initialValue
      : this.valueAsNumber;
    const returnedValue = (value - this.min) / (this.max - this.min);
    this.convertedValue = this.formula(returnedValue, this.min, this.max);
    return returnedValue;
  }
  get valueAsNumber() {
    if (this.input.value instanceof HTMLInputElement) {
      return this.input.value.valueAsNumber;
    }
    return NaN;
  }
  get value() {
    if (this.input.value instanceof HTMLInputElement) {
      return this.input.value.value;
    }
    return '';
  }
  set value(value) {
    if (this.input.value instanceof HTMLInputElement) {
      this.input.value.value = String(value);
      this.setFaderValueAttribute();
    }
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.initialType in FaderFormulas) {
      this.formula = FaderFormulas[this.initialType];
    }
    this.setFaderValueAttribute();
    this.convertedValue = this.formula(this.initialValue, this.min, this.max);
  }
  onInput(event) {
    this.setFaderValueAttribute();
    this.dispatchEvent(new InputEvent(event.type, event));
  }
  setFaderValueAttribute() {
    this.setAttribute('style', `--fader-value: ${this.normalisedValue}`);
  }
  render() {
    return html`
      <input
        ${ref(this.input)}
        ${spread(this.parentAttributes)}
        @input=${this.onInput}
        .max=${this.max}
        .min=${this.min}
        .value=${this.initialValue}
        aria-label="Range input from ${this.min} to ${this.max}"
        step="any"
        type="range"
      />
    `;
  }
}
__decorateClass([property({ type: Number })], Fader.prototype, 'max', 2);
__decorateClass([property({ type: Number })], Fader.prototype, 'min', 2);
__decorateClass(
  [property({ attribute: 'type', type: String })],
  Fader.prototype,
  'initialType',
  2
);
__decorateClass(
  [property({ attribute: 'value', type: Number })],
  Fader.prototype,
  'initialValue',
  2
);
window.customElements.define('root-fader', Fader);
