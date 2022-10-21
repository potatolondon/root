import { html } from 'lit-html';
import '../../components/synth/synth.lit.ts';

export default {
  title: 'Synth',
  parameters: {},
};

const Template = () => html`<wapp-synth></wapp-synth>`;

export const Basic = Template.bind({});
