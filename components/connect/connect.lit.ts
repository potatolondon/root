import { WappElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';

const output = 'output';

export class Connect extends WappElement {
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('noteOn', this.__connectNodes);
  }

  __connectNodes() {
    const nodes = this.querySelectorAll('[sendTo]');
    nodes.forEach(node => {
      const destination = node.sendTo === output ? audioCtx.destination : this.querySelector(`#${node.sendTo}`).audioNode;
      const audioNode = node.audioNode;
      console.log(audioNode);
      if(audioNode) {
        node.audioNode.connect(destination);
      }
    })
  }
}

customElements.define('wapp-connect', Connect);
