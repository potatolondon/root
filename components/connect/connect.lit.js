'use strict';
import { RootElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';
import '../oscillator';
import { Oscillator } from '../oscillator/oscillator.lit';
import { OscillatorModule } from '../oscillator/oscillator-module.lit';
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
  __searchBackwards(node) {
    let from = null;
    while (node) {
      if (node.enabled) {
        return node.audioNode;
      }
      from = document.querySelector(`#${node.recieveFrom}`);
      if (from && from.enabled) break;
      node = from;
    }
    return from == null ? void 0 : from.audioNode;
  }
  __searchForwards(node) {
    let to = null;
    while (node) {
      if (node.sendTo === output) {
        return audioCtx.destination;
      }
      to = document.querySelector(`#${node.sendTo}`);
      if (to && to.enabled) break;
      node = to;
    }
    return to == null ? void 0 : to.audioNode;
  }
  __getNodeChain(event) {
    const audioChain = /* @__PURE__ */ new Set();
    let audioNodes = Array.from(this.querySelectorAll('[sendTo]'));
    for (const node of audioNodes) {
      const from = [];
      if (node instanceof Oscillator) {
        from.push(node.__onNoteOn(event));
      } else if (node instanceof OscillatorModule) {
        const oscNodes = node.getOscNodes(event);
        oscNodes.forEach(node2 => {
          from.push(node2);
        });
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
        });
      }
    }
    for (const node of audioChain) {
      if (node.from && node.destination) {
        node.from.connect(node.destination);
      }
    }
  }
}
customElements.define('root-connect', Connect);
