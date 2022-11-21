import { html } from 'lit-html';

import './fader.lit.ts';

import FaderDocumentation from './FaderDocumentation.mdx';

export default {
  title: 'Fader',
  parameters: {
    docs: {
      page: FaderDocumentation,
    },
  },
};

const Template = () => html`<root-fader></root-fader>`;

export const Basic = Template.bind({});
