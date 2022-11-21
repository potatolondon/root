import { html, PropertyValueMap } from 'lit';
import { RootElement } from '../base.lit';
import '../oscillator/oscillator.lit';
import '../filter/filter.lit';
import '../keyboard/keyboard.lit';
import '../user-input/user-input.lit';
import '../midi-input/midi-input.lit';
import '../connect/connect.lit';


export class Synth extends RootElement {

  render() {
    return html`
    <root-midi></root-midi>
    <root-keyboard></root-keyboard>
    <root-connect>
      <root-osc id="osc-1" sendTo="filter-1"></root-osc>
      <root-filter id="filter-1" sendTo="output" recieveFrom="osc-1"></root-filter>
    </root-connect>
    `;
  }
}

window.customElements.define('root-synth', Synth);
