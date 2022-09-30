import { html, render } from 'lit';
import './components/synth/synth.lit.js';
import './components/user-input/user-input.lit.js';
import './components/midi-input/midi-input.lit.js';

render(
  html`
    <wapp-synth></wapp-synth>
    <user-input></user-input>
  `,
  document.querySelector('#synth')
);
