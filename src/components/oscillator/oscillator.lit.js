import { WappElement } from '../base.lit.js';
import { audioCtx } from '../../context/audioContext.js';

export class Oscillator extends WappElement {
  static get properties() {
    return {
      isNoteOn: { type: Boolean },
      frequency: { type: Number },
    };
  }

  constructor() {
    super();
    this.oscillator = undefined;
    this.activeNotes = [];
  }

  connectedCallback() {
    super.connectedCallback();
    audioCtx.addEventListener('statechange', () => this.updated());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    audioCtx.removeEventListener('statechange', () => this.updated());
  }

  __play() {
    this.oscillator = audioCtx.createOscillator();
    this.oscillator.frequency.setValueAtTime(
      this.frequency,
      audioCtx.currentTime
    );
    this.oscillator.start();
    this.activeNotes.push({ note: this.frequency, osc: this.oscillator });
    this.oscillator.connect(audioCtx.destination);
  }

  __stop(note) {
    const oscillatorToStop = this.activeNotes.find(
      activeNote => activeNote.note === note
    ).osc;
    oscillatorToStop.stop();
  }

  updated() {
    if (this.frequency) {
      if (this.isNoteOn) {
        this.__play();
      } else {
        this.__stop(this.frequency);
      }
    }
  }
}

window.customElements.define('wapp-osc', Oscillator);
