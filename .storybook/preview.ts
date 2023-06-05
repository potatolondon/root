import '../themes/default/base.css';
import '../components/display/display.css';
import '../components/fader/fader.css';
import '../components/filter/filter.css';
import '../components/keyboard/keyboard.css';
import '../components/oscillator/oscillator-module.css';
import '../components/oscillator/oscillator.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    options: {
      storySort: {
        order: ['Introduction', 'Components', 'Demos'],
      },
    },
  },
};
