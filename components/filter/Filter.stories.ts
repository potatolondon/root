import { html } from 'lit-html';

import './filter.lit.ts';

import FilterDocumentation from './FilterDocumentation.mdx';

export default {
  title: 'Components/Filter',
  parameters: {
    docs: {
      page: FilterDocumentation,
    },
  },
};

const Template = () => html`
<root-connect>
  <root-filter></root-filter>
</root-connect>`;

export const Basic = Template.bind({});
