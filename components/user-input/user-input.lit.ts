import { html } from 'lit';
import { WappElement } from '../base.lit';
import { audioCtx } from '../../lib/audioContext';

export class UserInputElement extends WappElement {
  connectedCallback() {
    super.connectedCallback();
    audioCtx.addEventListener('statechange', () => this.updated());
  }

  render() {
    return html`
      <dialog @close=${() => audioCtx.resume()}>
        <form method="dialog">
          <p>
            Your browser needs user input before this app is allowed to make
            sound, click OK to continue.
          </p>
          <button>OK</button>
        </form>
      </dialog>
    `;
  }

  updated() {
    if (audioCtx.state === 'suspended') {
      this.querySelector('dialog').showModal();
    }
  }
}

customElements.define('user-input', UserInputElement);
