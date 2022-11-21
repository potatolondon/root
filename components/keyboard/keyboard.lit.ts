import { html } from 'lit';
import { WappElement } from '../base.lit';

export interface Key {
  key: string;
  natural: boolean;
  note: number | false;
}

export class Keyboard extends WappElement {
  // Keyboard keys to use for musical typing
  static keys = Array.from("awsedftgyhujkolp;']\\");

  // Zero-indexed natural notes in a C major scale
  static naturals = [0, 2, 4, 5, 7, 9, 11];

  // Returns true if the note is natural or false if accidental
  static isNatural(note: number) {
    return this.naturals.includes(note % 12);
  }

  keys: Key[] = [];

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

  getNoteForKey(key: string) {
    const index = Keyboard.keys.indexOf(key);
    if (index < 0) throw new Error();
    return index + this.octave * 12;
  }

  __generateKeys() {
    for (const key of Keyboard.keys) {
      const note = this.getNoteForKey(key);
      const natural = Keyboard.isNatural(note);
      this.keys.push({ key, natural, note });
    }
  }

  __onKeyboarddown(event: KeyboardEvent) {
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

  __onKeyboardup(event: KeyboardEvent) {
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

  __onKeydown(event: KeyboardEvent | MouseEvent) {
    if (!(event?.target instanceof HTMLElement)) return;
    if (!event.target.matches('[data-note]')) return;

    const note = parseInt(event.target.dataset.note ?? '', 10);
    if (!note) return;
    this.dispatchEvent(
      new CustomEvent('noteOn', {
        bubbles: true,
        detail: { note },
      })
    );
  }

  __onKeyup(event: KeyboardEvent | MouseEvent) {
    if (!(event?.target instanceof HTMLElement)) return;
    if (!event.target.matches('[data-note]')) return;

    const note = parseInt(event.target.dataset.note ?? '', 10);
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
}

window.customElements.define('wapp-keyboard', Keyboard);
