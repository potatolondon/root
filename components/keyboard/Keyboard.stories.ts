import { html } from 'lit-html';

import './keyboard.lit.ts';
import './keyboard.css';

import KeyboardDocumentation from './KeyboardDocumentation.mdx';

export default {
  title: 'Components/Keyboard',
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: KeyboardDocumentation,
    },
  },
};

const Template = () => html` <root-midi></root-midi>
  <root-keyboard></root-keyboard>`;

export const Basic = Template.bind({});
