import { createRef, ref } from 'lit/directives/ref.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import { WappElement } from '../base.lit';

export class Fader extends WappElement {
  @property({ type: Number })
  max = 1;

  @property({ type: Number })
  min = 0;

  @property({ attribute: 'value', type: Number })
  initialValue = 0;

  // Override this to adjust the
  public formula = (x: number): number => x;

  private get parentAttributes() {
    const attrs: { [name: string]: string | null } = {};
    const exclude = ['id', 'max', 'min', 'value'];
    for (const name of this.getAttributeNames()) {
      if (!exclude.includes(name)) {
        attrs[name] = this.getAttribute(name);
      }
    }
    return attrs;
  }

  input = createRef();

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

  onInput(event: InputEvent) {
    this.dispatchEvent(new InputEvent(event.type, event));
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
        step="any"
        type="range"
      />
    `;
  }
}

window.customElements.define('root-fader', Fader);
