import '../demo/index.css';
import '../components/fader/fader.css';
import '../components/filter/filter.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    options: {
      storySort: {
        order: ['Introduction', 'Components', 'Demoes'],
      },
    },
  },
};
