import { html, PropertyValueMap } from 'lit';
import { WappElement } from '../base.lit';
import '../oscillator/oscillator.lit';
import '../filter/filter.lit';
import '../keyboard/keyboard.lit';
import '../user-input/user-input.lit';
import '../midi-input/midi-input.lit';
import '../connect/connect.lit';


export class Synth extends WappElement {

  render() {
    return html`
    <wapp-midi></wapp-midi>
    <wapp-keyboard></wapp-keyboard>
    <wapp-connect>
      <wapp-osc id="osc-1" sendTo="filter-1"></wapp-osc>
      <wapp-filter id="filter-1" sendTo="output" recieveFrom="osc-1"></wapp-filter>
    </wapp-connect>
    `;
  }
}

window.customElements.define('wapp-synth', Synth);
