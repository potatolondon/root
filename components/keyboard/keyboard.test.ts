import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import { Keyboard } from './keyboard.lit';

describe('Keyboard', () => {
  it('exists', async () => {
    const el: Keyboard = await fixture(html` <root-keyboard></root-keyboard> `);
    await expect(el).to.be.accessible();
    expect(el.octave).to.equal(5);
  });

  it('should generate keys', async () => {
    const el: Keyboard = await fixture(html` <root-keyboard></root-keyboard> `);
    expect(el.keys.length).to.be.equal(20);
    const C4 = el.keys[0];
    expect(C4.key).to.be.equal('a');
    expect(C4.natural).to.be.true;
    expect(C4.note).to.be.equal(60);
    expect(el.querySelectorAll('button')?.length).to.be.equal(20);
  });

  it('returns a note for a given key', async () => {
    const el: Keyboard = await fixture(html` <root-keyboard></root-keyboard> `);
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
    const state: Record<string, any> = {};

    const el: Keyboard = await fixture(html` <root-keyboard></root-keyboard> `);
    el.addEventListener('noteOn', event => {
      if (event instanceof CustomEvent) {
        state.noteOnFired = true;
        state.note = event.detail.note;
      }
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
