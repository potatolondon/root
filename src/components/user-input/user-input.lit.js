import { html, LitElement, css } from 'lit';
import { audioCtx } from '../../context/audioContext.js';

export class UserInputElement extends LitElement {
  static styles = css`
    dialog[open] {
      border-radius: 5px;
      display: grid;
      place-items: center;
    }

    form {
      display: contents;
    }

    button {
      all: unset;
      border-radius: 5px;
      border-style: solid;
      padding: 8px 16px;
    }
  `;

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
      this.shadowRoot.querySelector('dialog').showModal();
    }
  }
}

customElements.define('user-input', UserInputElement);
