import { html } from 'lit-html';
import '../../components/synth/synth.lit.js';

export default {
  title: 'Synth',
  parameters: {},
};

const Template = () => html`<wapp-synth></wapp-synth>`;

export const Basic = Template.bind({});
