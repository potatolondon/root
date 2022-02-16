import { html, LitElement } from 'lit';
import { audioCtx } from '../../context/audioContext.js';

export class Oscillator extends LitElement {
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

window.customElements.define('synth-osc', Oscillator);
