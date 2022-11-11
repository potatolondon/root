import { html } from 'lit';
import { WappElement } from '../base.lit';
import '../keyboard/keyboard.lit';
import '../user-input/user-input.lit';
import '../midi-input/midi-input.lit';


export class Synth extends WappElement {
  render() {
    return html`
      <wapp-midi></wapp-midi>
      <wapp-keyboard></wapp-keyboard>
      <wapp-osc id="oscillator-1" sendTo="filter-1"></wapp-osc>
      <wapp-filter id="filter-1" sendTo="output"></wapp-filter>
    `;
  }
}

window.customElements.define('wapp-synth', Synth);
