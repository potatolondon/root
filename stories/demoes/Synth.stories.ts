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

const SingleOscillator = () => html` <root-midi></root-midi>
  <root-keyboard></root-keyboard>
  <root-connect>
    <root-osc id="osc-1" sendTo="filter-1"></root-osc>
    <root-filter
      id="filter-1"
      sendTo="output"
      recieveFrom="osc-1"
    ></root-filter>
  </root-connect>`;

export const Basic = SingleOscillator.bind({});

const OscillatorModule = () => html` <root-midi></root-midi>
  <root-keyboard></root-keyboard>
  <root-connect>
    <root-osc-module id="osc-2" sendTo="filter-2"></root-osc-module>
    <root-filter
      id="filter-2"
      sendTo="output"
      recieveFrom="osc-2"
    ></root-filter>
  </root-connect>`;

export const SynthOscillatorModule = OscillatorModule.bind({});


const TwoOscTypes = () => html` <root-midi></root-midi>
  <root-keyboard></root-keyboard>
  <root-connect>
    <root-osc id="osc-3" sendTo="filter-3"></root-osc>
    <root-osc-module id="osc-4" sendTo="filter-3"></root-osc-module>
    <root-filter
      id="filter-3"
      sendTo="output"
      recieveFrom="osc-3 osc-4"
    ></root-filter>
  </root-connect>`;

export const SynthTwoOscillatorTypes = TwoOscTypes.bind({});
