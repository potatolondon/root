import { html } from 'lit';
import { WappElement } from '../base.lit.js';

export class Keyboard extends WappElement {
  keys = [];

  octaves = 1;

  startNote = 60; // Middle C

  constructor() {
    super();
    this.__generateKeys();
    this.__onKeydown = this.__onKeydown.bind(this);
    this.__onKeyup = this.__onKeyup.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mousedown', this.__onKeydown);
    this.addEventListener('mouseout', this.__onKeyup);
    this.addEventListener('mouseup', this.__onKeyup);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this.__onKeydown);
    this.removeEventListener('mouseout', this.__onKeyup);
    this.removeEventListener('mouseup', this.__onKeyup);
  }

  __generateKeys() {
    const numberOfKeys = this.octaves * 12;

    for (let i = 0; i <= numberOfKeys; i += 1) {
      const note = this.startNote + i;
      this.keys.push({ note });
    }
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
      ${this.keys.map(key => html`
        <button class="note" data-note=${key.note}>key</button>
      `)}
    `;
  }
}

window.customElements.define('wapp-keyboard', Keyboard);
