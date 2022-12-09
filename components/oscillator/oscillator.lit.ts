import { html } from 'lit';
import { map } from 'lit/directives/map.js';
import { Fader } from '../fader/fader.lit';
import { audioCtx } from '../../lib/audioContext';
import { property } from 'lit/decorators.js';
import { AudioComponent, RootElement } from '../base.lit';
import { BaseOscillator, NoteOnEvent } from './index';

export class Oscillator extends RootElement implements AudioComponent {
  private __onDetune: (event: InputEvent) => void;
  private __onDetuneStop: (event: MouseEvent) => void;
  __onDetuneAmount: (event: InputEvent) => void;
  __onNoteOn: (event: NoteOnEvent) => OscillatorNode | undefined;
  __onStickyToggle: (event: InputEvent) => void;
  __onWaveform: (event: InputEvent) => void;

  enabled = true;
  oscillator: BaseOscillator;
  waveform: string;
  waveforms: {};

  @property({ type: String })
  sendTo: string = '';

  @property({ type: String })
  recieveFrom: string = '';

  constructor() {
    super();
    this.oscillator = new BaseOscillator();
    this.__onDetune = this.oscillator.__onDetune;
    this.__onDetuneStop = this.oscillator.__onDetuneStop;
    this.__onStickyToggle = this.oscillator.__onStickyToggle;
    this.__onDetuneAmount = this.oscillator.__onDetuneAmount;
    this.__onWaveform = this.oscillator.__onWaveform;
    this.__onNoteOn = this.oscillator.__onNoteOn;
    this.waveforms = BaseOscillator.waveforms;
    this.waveform = this.oscillator.waveform;
  }

  render() {
    return html`
      <div class="root-osc">
        <label for="detune">Pitch bend</label>
        <div class="osc-pitch-bend">
          <root-fader
            @input=${this.__onDetune}
            @mouseup=${this.__onDetuneStop}
            id="detune"
            min="-1"
          ></root-fader>
          <label for="sticky">Sticky?</label>
          <input @input=${this.__onStickyToggle} id="sticky" type="checkbox" />
        </div>
        <label for="detune-amount">Pitch bend semitones</label>
        <input
          @input=${this.__onDetuneAmount}
          id="detune-amount"
          step="1"
          type="number"
          value="2"
        />
        <label for="waveform">Osc waveform</label>
        <select id="waveform" @change=${this.__onWaveform}>
          ${map(
            Object.entries(this.waveforms),
            ([value, label]) => html`
              <option ?selected=${value === this.waveform} value=${value}>
                ${label}
              </option>
            `
          )}
        </select>
      </div>
    `;
  }
}

window.customElements.define('root-osc', Oscillator);
