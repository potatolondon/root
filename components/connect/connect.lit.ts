import { RootElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';
import { NoteOnEvent } from 'components/oscillator';
import { property } from 'lit/decorators.js';

const output = 'output';

type AudioChainObject = {
  audioNode: AudioNode;
  destination: AudioNode;
};

export class Connect extends RootElement {
  @property()
  audioChain: AudioChainObject[];

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

  // gets nodes and connects them
  __getNodeChain(event: NoteOnEvent) {
    this.audioChain = [];
    let audioNodes = Array.from(this.querySelectorAll('[sendTo]'));
    const disabledNodes = audioNodes.filter(node => !node.enabled);

    if (disabledNodes) {
      for (const disabledNode of disabledNodes) {
        audioNodes = audioNodes.map(audioNode => {
          if (audioNode.id === disabledNode.recieveFrom) {
            audioNode.setAttribute('sendTo', disabledNode.sendTo);
          }
          return audioNode;
        });
      }
    }

    for (const node of audioNodes) {
      if (!node.enabled) {
        break;
      }

      let audioNode;
      if (node.oscillator) {
        audioNode = node.__onNoteOn(event);
      } else {
        audioNode = node.audioNode;
      }

      const destination =
        node.sendTo === output
          ? audioCtx.destination
          : document.querySelector(`#${node.sendTo}`).audioNode;
      this.audioChain.push({
        audioNode,
        destination,
      });
    }
  }

  updated() {
    if (this.audioChain) {
      for (const node of this.audioChain) {
        node.audioNode.connect(node.destination);
      }
    }
  }
}

customElements.define('root-connect', Connect);
