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
    const [command, note, value] = message.data;

    if (command === 144 && value > 0) {
      this.__noteOn(note);
    }

    if (command === 128 || (command === 144 && value === 0)) {
      this.__noteOff(note);
    }
  }

  __noteOn(note) {
    this.dispatchEvent(
      new CustomEvent('noteOn', {
        bubbles: true,
        detail: { note },
      })
    );
  }

  __noteOff(note) {
    this.dispatchEvent(
      new CustomEvent('noteOff', {
        bubbles: true,
        detail: { note },
      })
    );
  }
}

window.customElements.define('wapp-midi', MIDIInputElement);
