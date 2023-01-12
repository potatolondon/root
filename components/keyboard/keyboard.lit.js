'use strict';
import { html } from 'lit';
import { RootElement } from '../base.lit';
const _Keyboard = class extends RootElement {
  constructor() {
    super();
    this.keys = [];
    this.octave = 5;
    this.__generateKeys();
    this.__onKeyboarddown = this.__onKeyboarddown.bind(this);
    this.__onKeyboardup = this.__onKeyboardup.bind(this);
    this.__onKeydown = this.__onKeydown.bind(this);
    this.__onKeyup = this.__onKeyup.bind(this);
  }
  static isNatural(note) {
    return this.naturals.includes(note % 12);
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.__onKeyboarddown);
    window.addEventListener('keyup', this.__onKeyboardup);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.__onKeyboarddown);
    window.removeEventListener('keyup', this.__onKeyboardup);
  }
  getNoteForKey(key) {
    const index = _Keyboard.keys.indexOf(key);
    if (index < 0) throw new Error();
    return index + this.octave * 12;
  }
  __generateKeys() {
    for (const key of _Keyboard.keys) {
      const note = this.getNoteForKey(key);
      const natural = _Keyboard.isNatural(note);
      this.keys.push({ key, natural, note });
    }
  }
  __onKeyboarddown(event) {
    const note = this.getNoteForKey(event.key);
    if (!note) return;
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('noteOn', {
        bubbles: true,
        detail: { note },
      })
    );
  }
  __onKeyboardup(event) {
    const note = this.getNoteForKey(event.key);
    if (!note) return;
    event.preventDefault();
    this.dispatchEvent(
      new CustomEvent('noteOff', {
        bubbles: true,
        detail: { note },
      })
    );
  }
  __onKeydown(event) {
    var _a;
    if (!((event == null ? void 0 : event.target) instanceof HTMLElement))
      return;
    if (!event.target.matches('[data-note]')) return;
    const note = parseInt(
      (_a = event.target.dataset.note) != null ? _a : '',
      10
    );
    if (!note) return;
    this.dispatchEvent(
      new CustomEvent('noteOn', {
        bubbles: true,
        detail: { note },
      })
    );
  }
  __onKeyup(event) {
    var _a;
    if (!((event == null ? void 0 : event.target) instanceof HTMLElement))
      return;
    if (!event.target.matches('[data-note]')) return;
    const note = parseInt(
      (_a = event.target.dataset.note) != null ? _a : '',
      10
    );
    if (!note) return;
    this.dispatchEvent(
      new CustomEvent('noteOff', {
        bubbles: true,
        detail: { note },
      })
    );
  }
  render() {
    return html`
      <div class="notes">
        ${this.keys.map(
          ({ key, natural, note }) => html`
            <button
              @mousedown=${this.__onKeydown}
              @mouseout=${this.__onKeyup}
              @mouseup=${this.__onKeyup}
              @touchstart=${this.__onKeydown}
              @touchcancel=${this.__onKeyup}
              @touchend=${this.__onKeyup}
              class="note note-${natural ? 'natural' : 'accidental'}"
              data-note=${note}
            >
              ${key}
            </button>
          `
        )}
      </div>
    `;
  }
};
export let Keyboard = _Keyboard;
Keyboard.keys = Array.from("awsedftgyhujkolp;']\\");
Keyboard.naturals = [0, 2, 4, 5, 7, 9, 11];
window.customElements.define('root-keyboard', Keyboard);
