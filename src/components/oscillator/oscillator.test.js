// eslint-disable-next-line import/no-extraneous-dependencies
import { html, fixture, expect } from '@open-wc/testing';
import './oscillator.lit.js';

describe('Oscillator', () => {
  it('exists', async () => {
    const el = await fixture(html` <synth-osc></synth-osc> `);
    await expect(el).to.be.accessible();
    expect(el.oscillator.type).to.equal('sine');
  });
});
