import { RootElement } from 'components/base.lit';
import { html } from 'lit-html';
import { property } from 'lit/decorators.js';

export class SVG extends RootElement {
  @property({ type: String })
  type = '';

  getSVG() {
    switch (this.type) {
      case 'sine':
        return html`
          <svg
            width="18"
            height="8"
            viewBox="0 0 18 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 1L17 3.09167C17 5.25018 15.2502 7 13.0917 7V7C11.7849 7 10.5646 6.34691 9.83975 5.25962L8.16025 2.74038C7.43539 1.65308 6.21509 0.999999 4.90833 0.999999V0.999999C2.74982 0.999999 1 2.74982 1 4.90833L1 7"
              stroke="#C6C6C6"
              stroke-linecap="round"
            />
          </svg>
        `;
      case 'sawtooth':
        return html`
          <svg
            width="16"
            height="7"
            viewBox="0 0 16 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 6V1.51654C1 0.798624 1.73405 0.314593 2.39392 0.597394L15 6"
              stroke="#C6C6C6"
              stroke-linecap="round"
            />
          </svg>
        `;
      case 'square':
        return html`
          <svg
            width="18"
            height="8"
            viewBox="0 0 18 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 1L17 6C17 6.55228 16.5523 7 16 7L10 7C9.44771 7 9 6.55228 9 6L9 2C9 1.44771 8.55228 0.999999 8 0.999999L2 0.999999C1.44772 0.999999 1 1.44771 1 2L1 7"
              stroke="#C6C6C6"
              stroke-linecap="round"
            />
          </svg>
        `;
      case 'triangle':
        return html`
          <svg
            width="18"
            height="8"
            viewBox="0 0 18 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 3.66667L13.6402 6.46651C13.2693 6.77555 12.7307 6.77555 12.3598 6.46651L9 3.66666L5.64018 0.866818C5.26934 0.55778 4.73066 0.557779 4.35982 0.866818L1 3.66666"
              stroke="#C6C6C6"
              stroke-linecap="round"
            />
          </svg>
        `;
    }
  }

  render() {
    return this.getSVG();
  }
}

window.customElements.define('root-svg', SVG);
