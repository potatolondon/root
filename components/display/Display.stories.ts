import { html } from 'lit-html';

import './display.lit.ts';

import DisplayDocumentation from './DisplayDocumentation.mdx';

export default {
  title: 'Components/Display',
  parameters: {
    docs: {
      page: DisplayDocumentation,
    },
  },
};

const TemplateDisplay = () => html`
  <root-connect>
    <root-display kind="detune" .toggle=${false}></root-display>
  <root-connect>`;

export const NoToggle = TemplateDisplay.bind({});



const TemplateToggle = () => html`
  <root-connect>
  <input id="sinewave" type="checkbox" class="hidden"/>
  <label id="sinewave-label" for="sinewave">
    <root-display kind="sine"></root-display>
  </label>
  <root-connect>`;

export const Toggle = TemplateToggle.bind({});



const TemplateText = () => html`
  <root-connect>
  <input id="sticky" type="checkbox" class="hidden"/>
  <label id="sticky-label" for="sticky">
    <span class="hidden">Sticky</span>
    <root-display text="Sticky"/>
  </label>
  <root-connect>`;

export const Text = TemplateText.bind({});
