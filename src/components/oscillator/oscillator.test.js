// eslint-disable-next-line import/no-extraneous-dependencies
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import './oscillator.lit.js';

describe('Oscillator', () => {
  it('exists', async () => {
    const el = await fixture(html` <wapp-osc></wapp-osc> `);
    await expect(el).to.be.accessible();
    expect(el.oscillator).to.equal(undefined);
  });

  it('plays when note is on', async () => {
    const el = await fixture(html` <wapp-osc></wapp-osc> `);
    el.isNoteOn = true;
    el.frequency = 440;
    await nextFrame();
    await expect(el.oscillator.type).to.equal('sine');
    await expect(el.oscillator.frequency.value).to.equal(440);
  });
});
