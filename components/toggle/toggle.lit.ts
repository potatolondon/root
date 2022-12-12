import { RootElement } from 'components/base.lit';
import { html } from 'lit-html';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import '../svg/svg.lit';

export class Toggle extends RootElement {
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
              <div class="toggle-control">
                <root-svg type="${this.type}"></root-svg>
              </div>
              <div class="toggle-control__light"></div>
            </label>
          </div>
        `
      : html`
          <div class="toggle-control toggle-control__large">
            <root-svg type="${this.type}"></root-svg>
          </div>
        `;
  }
}

window.customElements.define('root-toggle', Toggle);
