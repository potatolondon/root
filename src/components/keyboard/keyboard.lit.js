import { html } from 'lit';
import { WappElement } from '../base.lit.js';

const KEY_STYLES = {
  WHITE: 'white',
  BLACK: 'black',
};

export class Keyboard extends WappElement {
  constructor() {
    super();

    this.baseFreq = 261.63;

    this.keys = [
      {
        name: 'C',
        frequency: 261.63,
        style: KEY_STYLES.WHITE,
      },
      {
        name: 'D',
        frequency: 293.66,
        style: KEY_STYLES.WHITE,
      },
    ];

    this.__onKeydown = this.__onKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.__onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.__onKeydown);
  }

  __onKeydown(event) {
    this.parentElement.noteOn(event);
  }

  __onKeyup(event) {
    this.parentElement.noteOff(event);
  }

  render() {
    return html`
      ${this.keys.map(
        key => html`
          <button class="note" data-note=${key.frequency}>${key.name}</button>
        `
      )}
    `;
  }
}

window.customElements.define('wapp-keyboard', Keyboard);
