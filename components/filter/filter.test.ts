import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import { Fader } from '../fader/fader.lit';
import { Filter } from './filter.lit';

describe('Filter', () => {
  it('exists', async () => {
    const el: Filter = await fixture(html` <root-filter></root-filter> `);
    await expect(el).to.be.accessible();
    expect(el).to.be.instanceOf(Filter);
  });

  it('has expected initial values', async () => {
    const el: Filter = await fixture(html` <root-filter></root-filter>`);
    expect(el.audioNode).to.be.instanceof(BiquadFilterNode);
    expect(el.enabled).to.equal(true);
    expect(el.audioNode.frequency.value).to.equal(22_050);
    expect(el.audioNode.type).to.equal('lowpass');
    expect(el.audioNode.gain.value).to.equal(0);
  });

  it('responds to changes in frequency', async () => {
    const el: Filter = await fixture(html` <root-filter></root-filter>`);
    const elFader = el.querySelector('#filter-frequency') as Fader;
    expect(elFader).to.be.instanceOf(Fader);
    elFader.value = 440;
    elFader.dispatchEvent(new InputEvent('input'));
    // expect(el.audioNode.frequency.value).to.equal(440); // FIXME
  });

  it('responds to changes in Q (resonance)', async () => {
    const el: Filter = await fixture(html` <root-filter></root-filter>`);
    const elFader = el.querySelector('#filter-q') as Fader;
    expect(elFader).to.be.instanceOf(Fader);
    elFader.value = 10;
    elFader.dispatchEvent(new InputEvent('input'));
    // expect(el.audioNode.Q.value).to.equal(10); // FIXME
  });

  it('responds to changes in type (mode)', async () => {
    const el: Filter = await fixture(html` <root-filter></root-filter>`);
    const elRadio = el.querySelector('#filter-type-highpass') as HTMLInputElement;
    expect(elRadio).to.be.instanceOf(HTMLInputElement);
    elRadio.click();
    expect(el.audioNode.type).to.equal('highpass');
  });

  it('responds to changes in gain (boost)', async () => {
    const el: Filter = await fixture(html` <root-filter></root-filter>`);
    const elFader = el.querySelector('#filter-gain') as Fader;
    expect(elFader).to.be.instanceOf(Fader);
    elFader.value = 10;
    elFader.dispatchEvent(new InputEvent('input'));
    // expect(el.audioNode.gain.value).to.equal(10); // FIXME
  });
});
