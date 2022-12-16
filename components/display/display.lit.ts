import { RootElement } from 'components/base.lit';
import { html } from 'lit-html';
import { property } from 'lit/decorators.js';
import '../svg/svg.lit';

export class Display extends RootElement {
  @property({ type: String })
  type = '';

  @property({ type: Boolean })
  toggle = true;

  render() {
    return this.toggle
      ? html`
          <div>
            <input type="checkbox" id="${this.type}-toggle" />
            <label for="${this.type}-toggle">
              <div class="display-control">
                <root-svg type="${this.type}"></root-svg>
              </div>
              <div class="display-control__light"></div>
            </label>
          </div>
        `
      : html`
          <div class="display-control display-control__large">
            <root-svg type="${this.type}"></root-svg>
          </div>
        `;
  }
}

window.customElements.define('root-display', Display);
