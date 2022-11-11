import { audioCtx } from '../../lib/audioContext';

export function connect(node:AudioNode, sendTo:string) {
  if(sendTo === 'output') {
    node.connect(audioCtx.destination)
  } else {
    const nodeToConnect = document.querySelector(`#${sendTo}`)
    node.connect(nodeToConnect?.audioNode);
  }
} 