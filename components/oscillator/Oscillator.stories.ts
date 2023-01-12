import { html } from 'lit-html';

import './oscillator.lit.ts';
import '../display/display.lit';

import OscillatorDocumentation from './OscillatorDocumentation.mdx';

export default {
  title: 'Oscillator',
  parameters: {
    docs: {
      page: OscillatorDocumentation,
    },
  },
};

const Template = () => html`<root-osc></root-osc>`;

export const Basic = Template.bind({});
