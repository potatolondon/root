import { RootElement } from '../base.lit';

export class MIDIInputElement extends RootElement {
  connectedCallback() {
    super.connectedCallback();
    this.__getDevice();
  }

  async __getDevice() {
    try {
      const access = await navigator.requestMIDIAccess();
      const devices = access.inputs.values();
      for (const device of devices) {
        device.onmidimessage = this.onMidiMessage.bind(this);
      }
    } catch {}
  }

  onMidiMessage(message: WebMidi.MIDIMessageEvent) {
    const [command, note, value] = message.data;

    if (command === 144 && value > 0) {
      this.__noteOn(note);
    }

    if (command === 128 || (command === 144 && value === 0)) {
      this.__noteOff(note);
    }
  }

  __noteOn(note: number) {
    this.dispatchEvent(
      new CustomEvent('noteOn', {
        bubbles: true,
        detail: { note },
      })
    );
  }

  __noteOff(note: number) {
    this.dispatchEvent(
      new CustomEvent('noteOff', {
        bubbles: true,
        detail: { note },
      })
    );
  }
}

window.customElements.define('root-midi', MIDIInputElement);
