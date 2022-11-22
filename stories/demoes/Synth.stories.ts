import { html } from 'lit-html';
import '../../components/oscillator/oscillator.lit';
import '../../components/filter/filter.lit';
import '../../components/keyboard/keyboard.lit';
import '../../components/user-input/user-input.lit';
import '../../components/midi-input/midi-input.lit';
import '../../components/connect/connect.lit';

export default {
  title: 'Synth',
  parameters: {},
};

const Template = () => html` <root-midi></root-midi>
  <root-keyboard></root-keyboard>
  <root-connect>
    <root-osc id="osc-1" sendTo="filter-1"></root-osc>
    <root-filter
      id="filter-1"
      sendTo="output"
      recieveFrom="osc-1"
    ></root-filter>
  </root-connect>`;

export const Basic = Template.bind({});
