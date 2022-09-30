// eslint-disable-next-line import/no-extraneous-dependencies
import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import './filter.lit.js';

describe('Filter', () => {
  it('exists', async () => {
    const el = await fixture(html` <wapp-filter></wapp-filter> `);
    await expect(el).to.be.accessible();
  });

  it('initial values', async () => {
    const el = await fixture(html` <wapp-filter></wapp-filter>`);
    expect(el.filterNode).to.not.equal(undefined);
    expect(el.isFilterOn).to.equal(false);
    expect(el.initialFrequency).to.equal(1000);
    expect(el.filterNode.type).to.equal('bandpass');
    expect(el.filterNode.gain.value).to.equal(10);
  });

  it('disables elements if filter is turned off', async () => {
    const el = await fixture(html` <wapp-filter></wapp-filter>`);
    expect(el.isFilterOn).to.equal(false);
    expect(el.querySelector('#filter-type').disabled).to.equal(true);
    expect(el.querySelector('#filter-frequency-range').disabled).to.equal(true);
    expect(el.querySelector('#filter-frequency-number').disabled).to.equal(
      true
    );
  });

  it('enables elements when filter is turned on', async () => {
    const el = await fixture(html` <wapp-filter></wapp-filter>`);
    expect(el.isFilterOn).to.equal(false);

    el.querySelector('#filter-switch').click();
    await nextFrame();
    expect(el.querySelector('#filter-type').disabled).to.equal(false);
    expect(el.querySelector('#filter-frequency-range').disabled).to.equal(
      false
    );
    expect(el.querySelector('#filter-frequency-number').disabled).to.equal(
      false
    );
  });
});
