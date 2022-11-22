import { RootElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';
import { AudioComponent, NoteOnEvent } from 'components/oscillator';
import { property } from 'lit/decorators.js';

const output = 'output';

export class Connect extends RootElement {
  constructor() {
    super();
    this.audioChain = [];
    this.__getNodeChain = this.__getNodeChain.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('noteOn', this.__getNodeChain);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('noteOn', this.__getNodeChain);
  }

  __searchBackwards(node: AudioComponent) {
    let from;

    while (node) {
      if (node.enabled) {
        return node.audioNode;
      }
      from = document.getElementById(node.recieveFrom);
      if (from && from.enabled) break;
      node = from;
    }
    return from.audioNode;
  }

  __searchForwards(node: AudioComponent) {
    let to;

    while (node) {
      if (node.sendTo === output) {
        return audioCtx.destination;
      }
      to = document.getElementById(node.sendTo);
      if (to && to.enabled) break;
      node = to;
    }

    return to.audioNode;
  }

  // gets nodes and connects them
  __getNodeChain(event: NoteOnEvent) {
    const audioChain = new Set();
    let audioNodes = Array.from(this.querySelectorAll('[sendTo]'));

    for (const node of audioNodes) {
      if (audioChain.has(node)) {
        break;
      }

      let from;
      // TODO make audio classes responsible for returning their own audioNode. This current logic will break if the source node is a microphone.
      if (node.oscillator) {
        from = node.__onNoteOn(event);
      } else {
        from = this.__searchBackwards(node);
      }
      const destination = this.__searchForwards(node);

      if (node.enabled) {
        audioChain.add({
          from,
          destination,
        });
      }
    }

    for (const node of audioChain) {
      node.from.connect(node.destination);
    }
  }
}

customElements.define('root-connect', Connect);
