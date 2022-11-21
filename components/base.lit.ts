import { LitElement } from 'lit';

/**
 * Base class for components used in the Microsite.
 * The main purpose for this component is to override Lit default rending root (shadow dom) in
 * in favour of just rendering a plain dom tree.
 *
 * The main reason is that we're planning to keep the rendering on the backend as much as possible
 * but when we do have to render something on the frontend we want the old themes, styles and apis
 * (written in the context of angularjs)
 * to work without having to re-architecture the microsyte styes.
 *
 * */
class RootElement extends LitElement {
  createRenderRoot() {
    /**
     * Render template without shadow DOM. Note that shadow DOM features like
     * encapsulated CSS and slots are unavailable.
     */
    return this;
  }
}

export { RootElement };
