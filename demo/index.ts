import { html, render } from 'lit';
import './components/synth/synth.lit';
import './components/user-input/user-input.lit';
import './components/midi-input/midi-input.lit';

render(
  html`
    <wapp-synth></wapp-synth>
    <user-input></user-input>
  `,
  document.querySelector('#synth')
);
