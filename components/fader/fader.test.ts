import { html, fixture, expect } from '@open-wc/testing';
import { Fader } from './fader.lit';

describe('Fader', () => {
  it('exists', async () => {
    const el: Fader = await fixture(html`<root-fader></root-fader>`);
    await expect(el).to.be.accessible();
    expect(el).to.be.instanceOf(Fader);
  });
});
