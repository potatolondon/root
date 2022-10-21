import { html } from 'lit-html';

import './keyboard.lit.ts';
import '../../demo/index.css'; // TODO move keyboard styles to ./keyboard.css

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