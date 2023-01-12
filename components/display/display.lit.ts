import { RootElement } from '../base.lit';
import { html } from 'lit-html';
import { property } from 'lit/decorators.js';
import '../svg/svg.lit';

export class Display extends RootElement {
  @property({ type: String })
  kind = '';

  @property({ type: Boolean })
  toggle = true;

  render() {
    return this.toggle
      ? html`
          <div class="display-control__wrapper">
            <div class="display-control">
              <root-svg type="${this.kind}"></root-svg>
            </div>
            <div class="display-control__light"></div>
          </div>
        `
      : html`
          <div class="display-control display-control__large">
            <root-svg type="${this.kind}"></root-svg>
          </div>
        `;
  }
}

window.customElements.define('root-display', Display);
