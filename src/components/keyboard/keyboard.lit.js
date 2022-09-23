import { html } from 'lit';
import { WappElement } from '../base.lit.js';

export class Keyboard extends WappElement {
  // Keyboard keys to use for musical typing
  static keys = Array.from("awsedftgyhujkolp;']\\");

  // Zero-indexed natural notes in a C major scale
  static naturals = [0, 2, 4, 5, 7, 9, 11];

  // Returns true if the note is natural or false if accidental
  static isNatural(note) {
    return this.naturals.includes(note % 12);
  }

  keys = [];

  octave = 5; // 5 * 12 = MIDI note 60 = C5 = Middle C

  constructor() {
    super();
    this.__generateKeys();
    this.__onKeyboarddown = this.__onKeyboarddown.bind(this);
    this.__onKeyboardup = this.__onKeyboardup.bind(this);
    this.__onKeydown = this.__onKeydown.bind(this);
    this.__onKeyup = this.__onKeyup.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.__onKeyboarddown);
    window.addEventListener('keyup', this.__onKeyboardup);
    this.addEventListener('mousedown', this.__onKeydown);
    this.addEventListener('mouseout', this.__onKeyup);
    this.addEventListener('mouseup', this.__onKeyup);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.__onKeyboarddown);
    window.removeEventListener('keyup', this.__onKeyboardup);
    this.removeEventListener('mousedown', this.__onKeydown);
    this.removeEventListener('mouseout', this.__onKeyup);
    this.removeEventListener('mouseup', this.__onKeyup);
  }

  getNoteForKey(key) {
    const index = Keyboard.keys.indexOf(key);
    if (index < 0) return false;
    return index + this.octave * 12;
  }

  __generateKeys() {
    for (const key of Keyboard.keys) {
      const note = this.getNoteForKey(key);
      const natural = Keyboard.isNatural(note);
      this.keys.push({ key, natural, note });
    }
  }

  async __onKeyboarddown(event) {
    const note = this.getNoteForKey(event.key);
    if (!note) return;
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('noteOn', {
      bubbles: true,
      detail: { note },
    }));
  }

  async __onKeyboardup(event) {
    const note = await this.getNoteForKey(event.key);
    if (!note) return;
    event.preventDefault();
    this.dispatchEvent(new CustomEvent('noteOff', {
      bubbles: true,
      detail: { note },
    }));
  }

  __onKeydown(event) {
    const note = parseInt(event.target.dataset.note, 10);
    if (!note) return;
    this.dispatchEvent(new CustomEvent('noteOn', {
      bubbles: true,
      detail: { note },
    }));
  }

  __onKeyup(event) {
    const note = parseInt(event.target.dataset.note, 10);
    if (!note) return;
    this.dispatchEvent(new CustomEvent('noteOff', {
      bubbles: true,
      detail: { note },
    }));
  }

  render() {
    return html`
      <div class="notes">
        ${this.keys.map(({ key, natural, note }) => html`
          <button
            @mousedown=${this.__onKeydown}
            @mouseout=${this.__onKeyup}
            @mouseup=${this.__onKeyup}
            class="note note-${natural ? 'natural' : 'accidental'}"
            data-note=${note}>${key}</button>
        `)}
      </div>
    `;
  }
}

window.customElements.define('wapp-keyboard', Keyboard);
