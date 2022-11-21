import { html } from 'lit-html';

import './filter.lit.ts';

import FilterDocumentation from './FilterDocumentation.mdx';

export default {
  title: 'Filter',
  parameters: {
    docs: {
      page: FilterDocumentation,
    },
  },
};

const Template = () => html`<root-filter></root-filter>`;

export const Basic = Template.bind({});
