import { html } from 'lit-html';

import './oscillator.lit.ts';
import './oscillator-module.lit.ts';
import '../display/display.lit';

import OscillatorDocumentation from './OscillatorDocumentation.mdx';

export default {
  title: 'Components/Oscillator',
  parameters: {
    docs: {
      page: OscillatorDocumentation,
    },
  },
};

const Template = () => html`
  <root-midi></root-midi>
  <root-connect>
    <root-osc sendTo="output"></root-osc>
  </root-connect>
  `;

export const Basic = Template.bind({});


const OscModule = () => html`
  <root-midi></root-midi>
  <root-connect>
    <root-osc-module sendTo="output"></root-osc-module>
  </root-connect>
  `;

export const OscillatorModule = OscModule.bind({});