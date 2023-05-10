import { html } from 'lit-html';

import './fader.lit.ts';

import FaderDocumentation from './FaderDocumentation.mdx';

export default {
  title: 'Components/Fader',
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: FaderDocumentation,
    },
  },
};

const Template = () => html` <root-connect>
  <root-fader></root-fader>
  <root-connect></root-connect
></root-connect>`;

export const Basic = Template.bind({});

const TemplateQuadratic = () => html` <root-connect>
  <root-fader type="quadratic"></root-fader>
  <root-connect></root-connect
></root-connect>`;

export const Quadratic = TemplateQuadratic.bind({});

const TemplateGoldenRatio = () => html` <root-connect>
  <root-fader type="goldenration"></root-fader>
  <root-connect></root-connect
></root-connect>`;

export const GoldenRatio = TemplateGoldenRatio.bind({});
