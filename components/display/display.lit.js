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
import { html } from 'lit-html';
import { property } from 'lit/decorators.js';
import '../svg/svg.lit';
export class Display extends RootElement {
  constructor() {
    super(...arguments);
    this.kind = '';
    this.toggle = true;
    this.text = '';
  }
  addText() {
    if (!this.kind) {
      return html` <h3 class="module__text">${this.text}</h3> `;
    }
  }
  render() {
    return this.toggle
      ? html`
          <div class="display-control__wrapper">
            <div class="display-control">
              <root-svg type="${this.kind}"></root-svg>
              ${this.addText()}
            </div>
            <div class="display-control__light"></div>
          </div>
        `
      : html`
          <div class="display-control display-control__large">
            <root-svg type="${this.kind}"></root-svg>
            ${this.addText()}
          </div>
        `;
  }
}
__decorateClass([property({ type: String })], Display.prototype, 'kind', 2);
__decorateClass([property({ type: Boolean })], Display.prototype, 'toggle', 2);
__decorateClass([property({ type: String })], Display.prototype, 'text', 2);
window.customElements.define('root-display', Display);
