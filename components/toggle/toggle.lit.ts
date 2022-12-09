import { RootElement } from 'components/base.lit';
import { html } from 'lit-html';
import { property } from 'lit/decorators.js';
import '../svg/svg.lit';

export class Toggle extends RootElement {
  @property({ type: String })
  type = '';

  render() {
    return html`
      <div>
        <input type="checkbox" id="${this.type}-toggle" />
        <label for="${this.type}-toggle">
          <div class="toggle-control">
            <root-svg type="${this.type}"></root-svg>
          </div>
        </label>
      </div>
    `;
  }
}

window.customElements.define('root-toggle', Toggle);
