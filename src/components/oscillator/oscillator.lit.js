import { html } from 'lit';
import { WappElement } from '../base.lit.js';
import { audioCtx } from '../../context/audioContext.js';

export class Oscillator extends WappElement {
  constructor() {
    super();
    this.oscillator = audioCtx.createOscillator();
  }

  __play() {
    this.oscillator.connect(audioCtx.destination);
    this.oscillator.start();
  }

  render() {
    return html` <button @click=${this.__play}>Play</button> `;
  }
}

window.customElements.define('wapp-osc', Oscillator);
