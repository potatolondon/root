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
    expect(el.activeNotes.size).to.equal(1);

    await nextFrame();

    const oscillator = el.activeNotes.get(69);
    expect(oscillator.type).to.equal('sine');
    expect(oscillator.frequency.value).to.equal(440);
  });

  it('stops playing when stop method is called', async () => {
    /** @type {Oscillator} */
    const el = await fixture(html` <wapp-osc></wapp-osc> `);
    el.stop(69); // A4 - 440 Hz
    expect(el.activeNotes.size).to.equal(0);
  });

  it('responds to detune', async () => {
    /** @type {Oscillator} */
    const el = await fixture(html` <wapp-osc></wapp-osc> `);

    /** @type {HTMLInputElement?} */
    const detuneInput = el.querySelector('#detune');
    if (!detuneInput) throw new Error('<wapp-osc> does not contain #detune');

    detuneInput.value = '-1';
    detuneInput.dispatchEvent(new InputEvent('input'));
    expect(el.detune).to.equal(-200);
    expect(el.stickyPitchBend).to.be.false;

    detuneInput.dispatchEvent(new MouseEvent('mouseup'));
    expect(el.detune).to.equal(0);
  });

  it('detune stickiness', async () => {
    /** @type {Oscillator} */
    const el = await fixture(html` <wapp-osc></wapp-osc> `);

    /** @type {HTMLInputElement?} */
    const stickyInput = el.querySelector('#sticky');
    if (!stickyInput) throw new Error('<wapp-osc> does not contain #sticky');

    stickyInput.checked = true;
    stickyInput.dispatchEvent(new InputEvent('input'));

    /** @type {HTMLInputElement?} */
    const detuneInput = el.querySelector('#detune');
    if (!detuneInput) throw new Error('<wapp-osc> does not contain #detune');

    detuneInput.value = '-1';
    detuneInput.dispatchEvent(new InputEvent('input'));
    expect(el.detune).to.equal(-200);
    expect(el.stickyPitchBend).to.be.true;

    detuneInput?.dispatchEvent(new MouseEvent('mouseup'));
    expect(el.detune).to.equal(-200);
  });
});
