import { html } from 'lit';
import { WappElement } from '../base.lit.js';

export class Keyboard extends WappElement {
  constructor() {
    super();

    this.baseFreq = 261.63;
    this.octaves = 1;

    this.keys = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.__generateKeys();
    this.addEventListener('mousedown', this.__onKeydown);
    this.addEventListener('mouseup', this.__onKeyup);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('mousedown', this.__onKeydown);
    this.removeEventListener('mouseup', this.__onKeyup);
  }

  __generateKeys() {
    let currFreq = this.baseFreq;
    const numberOfKeys = this.octaves * 12;

    for (let i = 0; i <= numberOfKeys; i += 1) {
      const frequency = currFreq;
      this.keys.push({
        frequency,
      });
      currFreq *= 2 ** (1 / 12);
    }
  }

  __onKeydown(event) {
    this.parentElement.noteOn(event.target.attributes['data-note'].value);
  }

  __onKeyup(event) {
    this.parentElement.noteOff(event.target.attributes['data-note'].value);
  }

  render() {
    return html`
      ${this.keys.map(
        key => html`
          <button class="note" data-note=${key.frequency}>key</button>
        `
      )}
    `;
  }
}

window.customElements.define('wapp-keyboard', Keyboard);
