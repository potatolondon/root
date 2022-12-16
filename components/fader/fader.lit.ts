import { createRef, ref } from 'lit/directives/ref.js';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { spread } from '@open-wc/lit-helpers';
import { RootElement } from '../base.lit';

export type FaderFormula = (x: number, min: number, max: number) => number;

/**
 * These fader formulas are easing functions that adjust how faders behave.
 * The default formula is `FaderFormulas.linear` which maps the fader
 * position directly to its output value. To change the easing you can set
 * the fader’s `formula` property to a different function. You can pass any
 * of the default `FaderFormulas` or provide a custom easing function.
 */
export const FaderFormulas: Record<string, FaderFormula> = {
  goldenratio: (x, min, max) => ((x - min) / (max - min)) ** (1 / 5 ** 0.5),
  linear: x => x,
  quadratic: (x, min) => min + (x - min) ** 2,
};

export class Fader extends RootElement {
  @property({ type: Number })
  max = 1;

  @property({ type: Number })
  min = 0;

  @property({ attribute: 'type', type: String })
  initialType = 'linear';

  @property({ attribute: 'value', type: Number })
  initialValue = 0;

  /**
   * The easing function used by this component to map the fader position
   * to the output value. Other formulas are available in the `FaderFormulas`
   * export, or you can provide your own easing function.
   * @example
   * import { FaderFormulas } from '@potato/root/components/fader';
   *
   * const mySlider = document.querySelector('root-fader');
   * mySlider.formula = FaderFormulas.GOLDEN_RATIO;
   */
  public formula: FaderFormula = FaderFormulas.linear;

  private get parentAttributes() {
    const attrs: { [name: string]: string | null } = {};
    const exclude = ['id', 'max', 'min', 'style', 'value'];
    for (const name of this.getAttributeNames()) {
      if (!exclude.includes(name)) {
        attrs[name] = this.getAttribute(name);
      }
    }
    return attrs;
  }

  input = createRef();

  /** Returns a value normalised between 0-1. */
  get normalisedValue() {
    const value = Number.isNaN(this.valueAsNumber)
      ? this.initialValue
      : this.valueAsNumber;
    return (value - this.min) / (this.max - this.min);
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

  set value(value: unknown) {
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
  }

  onInput(event: InputEvent) {
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

window.customElements.define('root-fader', Fader);
