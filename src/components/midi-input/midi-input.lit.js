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
    const [toggle, note] = message.data;
    if (toggle === 144 || toggle === 128) {
      if (toggle === 144) {
        return this.__noteOn(note);
      }
    }
    return this.__noteOff(note);
  }

  __onNoteOn(note) {
    this.dispatchEvent(new CustomEvent('noteOn', {
      bubbles: true,
      detail: { note },
    }));
  }

  __onNoteOff(note) {
    this.dispatchEvent(new CustomEvent('noteOff', {
      bubbles: true,
      detail: { note },
    }));
  }
}

window.customElements.define('wapp-midi', MIDIInputElement);
