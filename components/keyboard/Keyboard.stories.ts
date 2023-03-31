import { html } from 'lit-html';

import './keyboard.lit.ts';
import './keyboard.css';

import KeyboardDocumentation from './KeyboardDocumentation.mdx';

export default {
  title: 'Keyboard',
  parameters: {
    docs: {
      page: KeyboardDocumentation,
    },
  },
};

const Template = () => html`<root-keyboard></root-keyboard>`;

export const Basic = Template.bind({});
