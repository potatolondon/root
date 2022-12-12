import { expect, html, fixture } from '@open-wc/testing';
import { BaseOscillator } from './index';
import { Oscillator } from './oscillator.lit';

let el: Oscillator;
let oscillator: BaseOscillator;
let detuneInput: HTMLInputElement;
let stickyInput: HTMLInputElement;

describe('Oscillator', () => {
  beforeEach(async () => {
    el = await fixture(html` <root-osc></root-osc> `);
    oscillator = el.oscillator;
    expect(el).to.be.instanceOf(Oscillator);
    expect(oscillator).to.be.instanceOf(BaseOscillator);
  });

  it('exists', async () => {
    await expect(el).to.be.accessible();
    expect(oscillator.activeNotes.size).to.equal(0);
  });

  it('can convert a MIDI note to a frequency', () => {
    expect(BaseOscillator.noteToFrequency(69)).to.be.equal(440);
  });

  it('plays when start method is called', () => {
    oscillator.start(69); // A4 - 440 Hz
    expect(oscillator.activeNotes.size).to.equal(1);

    const oscillatorNode: OscillatorNode | undefined =
      oscillator.activeNotes.get(69);
    expect(oscillatorNode?.type).to.equal('sine');
    expect(oscillatorNode?.frequency.value).to.equal(440);
  });

  it('stops playing when stop method is called', () => {
    oscillator.stop(69); // A4 - 440 Hz
    expect(oscillator.activeNotes.size).to.equal(0);
  });
});

describe('Detune', () => {
  beforeEach(async () => {
    el = await fixture(html` <root-osc></root-osc> `);
    oscillator = el.oscillator;
    detuneInput = el.querySelector('#detune')!;
    stickyInput = el.querySelector('#sticky')!;
    expect(el).to.be.instanceOf(Oscillator);
    expect(oscillator).to.be.instanceOf(BaseOscillator);
    expect(detuneInput).to.be.instanceOf(HTMLElement);
    expect(stickyInput).to.be.instanceOf(HTMLElement);
  });

  it('responds to detune', () => {
    detuneInput.value = '-1';
    detuneInput.dispatchEvent(new InputEvent('input'));
    expect(oscillator.detune).to.equal(-200);
    expect(oscillator.stickyPitchBend).to.be.false;

    detuneInput.dispatchEvent(new MouseEvent('mouseup'));
    expect(oscillator.detune).to.equal(0);
  });

  it('detune stickiness', () => {
    stickyInput.checked = true;
    stickyInput.dispatchEvent(new InputEvent('input'));

    detuneInput.value = '-1';
    detuneInput.dispatchEvent(new InputEvent('input'));
    expect(oscillator.detune).to.equal(-200);
    expect(oscillator.stickyPitchBend).to.be.true;

    detuneInput.dispatchEvent(new MouseEvent('mouseup'));
    expect(oscillator.detune).to.equal(-200);
  });
});
