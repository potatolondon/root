import { RootElement } from 'components/base.lit';
import { html } from 'lit-html';
import { property } from 'lit/decorators.js';
import '../svg/svg.lit';

export class Toggle extends RootElement {
  @property({ type: String })
  label = '';

  @property({ type: String })
  id = '';

  render() {
    return html`
      <label for="${this.id}">${this.label}</label>
      <input id="${this.id}" type=checkbox "/>

      <div class="toggle-control">
        <div class="toggle-control__type">
          <root-svg type="${this.id}"></root-svg>
        </div>
        <div class="toggle-control__light" />
      </div>
    `;
  }
}

window.customElements.define('root-toggle', Toggle);
