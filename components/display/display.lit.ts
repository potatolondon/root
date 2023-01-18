import { RootElement } from '../base.lit';
import { html } from 'lit-html';
import { property } from 'lit/decorators.js';
import '../svg/svg.lit';

export class Display extends RootElement {
  @property({ type: String })
  kind = '';

  @property({ type: Boolean })
  toggle = true;

  @property({ type: String })
  text = '';

  addText() {
    if(!this.kind) {
      return html`
    <h3 class="module__text">${this.text}</h3>
      `
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

window.customElements.define('root-display', Display);
