import { html } from 'lit-html';

import './keyboard.lit.js';
import '../../index.css';

import KeyboardDocumentation from './KeyboardDocumentation.mdx';

export default {
  title: 'Keyboard',
  parameters: {
    docs: {
      page: KeyboardDocumentation,
    },
  },
};

const Template = () => html`<wapp-keyboard></wapp-keyboard>`;

export const Basic = Template.bind({});
