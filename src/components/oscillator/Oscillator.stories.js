import { html } from 'lit-html';

import './oscillator.lit.js';

import OscillatorDocumentation from './OscillatorDocumentation.mdx';

export default {
  title: 'Example/Oscillator',
  parameters: {
    docs: {
      page: OscillatorDocumentation,
    },
  },
};

const Template = () => html`<wapp-osc></wapp-osc>`;

export const Basic = Template.bind({});
