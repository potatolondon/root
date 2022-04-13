/* eslint-disable class-methods-use-this */
import { WappElement } from '../base.lit.js';

export class MIDIInputElement extends WappElement {
  connectedCallback() {
    super.connectedCallback();
    this.__getDevice();
  }

  async __getDevice() {
    const access = await navigator.requestMIDIAccess();
    const devices = access.inputs.values();
    for (const device of devices) {
      device.onmidimessage = this.onMidiMessage.bind(this);
    }
  }

  onMidiMessage(message) {
    const [toggle, midiNum] = message.data;
    if (toggle === 144 || toggle === 128) {
      const note = 440 * 2 ** ((midiNum - 69) / 12);
      if (toggle === 144) {
        this.parentElement.noteOn(note);
      } else {
        this.parentElement.noteOff(note);
      }
    }
  }
}

window.customElements.define('wapp-midi', MIDIInputElement);
