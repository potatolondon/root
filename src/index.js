import { html, render } from 'lit';
import './components/keyboard/keyboard.lit.js';
import './components/oscillator/oscillator.lit.js';
import './components/synth/synth.lit.js';
import './components/user-input/user-input.lit.js';
import './components/midi-input/midi-input.lit.js';

render(
  html`
    <wapp-synth>
      <wapp-osc></wapp-osc>
      <wapp-keyboard></wapp-keyboard>
      <wapp-midi></wapp-midi>
    </wapp-synth>
    <user-input></user-input>
  `,
  document.querySelector('#synth'),
);
