import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import { Oscillator } from './oscillator.lit.js';

describe('Oscillator', () => {
  it('exists', async () => {
    /** @type {Oscillator} */
    const el = await fixture(html` <wapp-osc></wapp-osc> `);
    await expect(el).to.be.accessible();
    expect(el.activeNotes.size).to.equal(0);
  });

  it('can convert a MIDI note to a frequency', () => {
    expect(Oscillator.noteToFrequency(69)).to.be.equal(440);
  });

  it('plays when start method is called', async () => {
    /** @type {Oscillator} */
    const el = await fixture(html` <wapp-osc></wapp-osc> `);
    el.start(69); // A4 - 440 Hz
    await expect(el.activeNotes.size).to.equal(1);
    await nextFrame();
    const oscillator = el.activeNotes.get(69);
    await expect(oscillator.type).to.equal('sine');
    await expect(oscillator.frequency.value).to.equal(440);
  });

  it('stops playing when stop method is called', async () => {
    /** @type {Oscillator} */
    const el = await fixture(html` <wapp-osc></wapp-osc> `);
    el.stop(69); // A4 - 440 Hz
    await expect(el.activeNotes.size).to.equal(0);
    await nextFrame();
  });
});
