import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import { Keyboard } from './keyboard.lit.js';

describe('Keyboard', () => {
  it('exists', async () => {
    /** @type {Keyboard} */
    const el = await fixture(html` <wapp-keyboard></wapp-keyboard> `);
    await expect(el).to.be.accessible();
    expect(el.octave).to.equal(5);
  });

  it('should generate keys', async () => {
    /** @type {Keyboard} */
    const el = await fixture(html` <wapp-keyboard></wapp-keyboard> `);
    expect(el.keys.length).to.be.equal(20);
    const C4 = el.keys[0];
    expect(C4.key).to.be.equal('a');
    expect(C4.natural).to.be.true;
    expect(C4.note).to.be.equal(60);
    expect(el.querySelectorAll('button')?.length).to.be.equal(20);
  });

  it('returns a note for a given key', async () => {
    /** @type {Keyboard} */
    const el = await fixture(html` <wapp-keyboard></wapp-keyboard> `);
    const Eb4 = el.keys[1];
    const Bb4 = el.keys[10];
    expect(el.getNoteForKey('w')).to.be.equal(Eb4.note);
    expect(el.getNoteForKey('u')).to.be.equal(Bb4.note);
  });

  it('returns whether a MIDI note is natural', async () => {
    expect(Keyboard.isNatural(60)).to.be.true;
    expect(Keyboard.isNatural(61)).to.be.false;
  });

  it('should respond to keyboard events with a noteOn and noteOff', async () => {
    const state = {};

    /** @type {Keyboard} */
    const el = await fixture(html` <wapp-keyboard></wapp-keyboard> `);
    el.addEventListener('noteOn', event => {
      state.noteOnFired = true;
      state.note = /** @type {CustomEvent} */ (event).detail.note;
    });
    el.addEventListener('noteOff', () => {
      state.noteOffFired = true;
      delete state.note;
    });

    // Trigger keydown → noteOn
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    await nextFrame();
    expect(state.noteOnFired).to.be.true;
    expect(state.note).to.be.equal(60);

    // Trigger keyup → noteOff
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    await nextFrame();
    expect(state.noteOffFired).to.be.true;
    expect(state.note).to.be.undefined;
  });
});
