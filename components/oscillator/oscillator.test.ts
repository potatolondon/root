import { expect, html, fixture } from '@open-wc/testing';
import { BaseOscillator } from './index';

let oscillator: BaseOscillator;
let inputEl;
let stickyEl;
let detuneInput: HTMLInputElement;
let stickyInput: HTMLInputElement;

describe('Oscillator', () => {
  beforeEach(() => {
    oscillator = new BaseOscillator();
  });

  it('exists', () => {
    expect(oscillator).to.be.accessible();
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
    oscillator = new BaseOscillator();
    inputEl = html`<input
      @input=${oscillator.__onDetune}
      @mouseup=${oscillator.__onDetuneStop}
      id="detune"
      max="1"
      min="-1"
      step="any"
      type="range"
      value="0"
    />`;

    detuneInput = await fixture(inputEl);
    stickyEl = html`<input
      @input=${oscillator.__onStickyToggle}
      id="sticky"
      type="checkbox"
    />`;
    stickyInput = await fixture(stickyEl);
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

    detuneInput?.dispatchEvent(new MouseEvent('mouseup'));
    expect(oscillator.detune).to.equal(-200);
  });
});
