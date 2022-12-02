import { AudioComponent, RootElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';
import { NoteOnEvent } from 'components/oscillator';
import { Oscillator } from 'components/oscillator/oscillator.lit';
import { OscillatorModule } from 'components/oscillator/oscillator-module.lit';

const output = 'output';

export class Connect extends RootElement {
  constructor() {
    super();
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

  __searchBackwards(node: AudioComponent | null) {
    let from: AudioComponent | null = null;

    while (node) {
      if (node.enabled) {
        return node.audioNode;
      }
      from = document.querySelector(`#${node.recieveFrom}`);
      if (from && from.enabled) break;
      node = from;
    }
    return from?.audioNode;
  }

  __searchForwards(node: AudioComponent | null) {
    let to: AudioComponent | null = null;

    while (node) {
      if (node.sendTo === output) {
        return audioCtx.destination;
      }
      to = document.querySelector(`#${node.sendTo}`);
      if (to && to.enabled) break;
      node = to;
    }

    return to?.audioNode;
  }

  // gets nodes and connects them
  __getNodeChain(event: NoteOnEvent) {
    const audioChain: Set<{
      from?: AudioNode | null;
      destination?: AudioNode | null;
    }> = new Set();
    let audioNodes: AudioComponent[] = Array.from(
      this.querySelectorAll('[sendTo]')
    );

    for (const node of audioNodes) {
      const from = [];
      // TODO make audio classes responsible for returning their own audioNode. This current logic will break if the source node is a microphone.
      if (node instanceof Oscillator) {
        from.push(node.__onNoteOn(event));
      } else if (node instanceof OscillatorModule) {
        const oscNodes = node.getOscNodes(event)

        oscNodes.forEach(node => {
          from.push(node);
        })
      } else {
        from.push(this.__searchBackwards(node));
      }
      const destination = this.__searchForwards(node);

      if (node.enabled) {
        from.forEach(fromNode => {
          audioChain.add({
            from: fromNode,
            destination,
          });
        })
      }
    }

    // audioChain.forEach(item => {
    //   console.log(item.from.type)
    // })

    for (const node of audioChain) {
      if (node.from && node.destination) {
        node.from.connect(node.destination);
      }
    }
  }
}

customElements.define('root-connect', Connect);
