import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import { Filter } from './filter.lit';

describe('Filter', () => {
  it('exists', async () => {
    const el: Filter = await fixture(html` <wapp-filter></wapp-filter> `);
    await expect(el).to.be.accessible();
    expect(el).to.be.instanceOf(Filter);
  });

  it('initial values', async () => {
    const el: Filter = await fixture(html` <wapp-filter></wapp-filter>`);
    expect(el.audioNode).to.not.equal(undefined);
    expect(el.enabled).to.equal(true);
    expect(el.initialFrequency).to.equal(1000);
    expect(el.audioNode.type).to.equal('bandpass');
    expect(el.audioNode.gain.value).to.equal(10);
  });

  it('disables elements if filter is turned off', async () => {
    const el: Filter = await fixture(html` <wapp-filter></wapp-filter>`);
    expect(el.enabled).to.equal(true);
    const elFilterSwitch = el.querySelector('#filter-switch') as HTMLElement;
    elFilterSwitch.click();
    await el.requestUpdate();
    expect(el.enabled).to.equal(false);
    // TODO expose these as ref properties?
    const elFilterType = el.querySelector('#filter-type') as HTMLInputElement;
    const elFrequencyRange = el.querySelector(
      '#filter-frequency-range'
    ) as HTMLInputElement;
    const elFrequencyNumber = el.querySelector(
      '#filter-frequency-number'
    ) as HTMLInputElement;

    expect(elFilterType.disabled).to.equal(true);
    expect(elFrequencyRange.disabled).to.equal(true);
    expect(elFrequencyNumber.disabled).to.equal(true);
  });

  it('enables elements when filter is turned on', async () => {
    const el: Filter = await fixture(html` <wapp-filter></wapp-filter>`);
    expect(el.enabled).to.equal(true);
    const elFilterType = el.querySelector('#filter-type') as HTMLInputElement;
    const elFrequencyRange = el.querySelector(
      '#filter-frequency-range'
    ) as HTMLInputElement;
    const elFrequencyNumber = el.querySelector(
      '#filter-frequency-number'
    ) as HTMLInputElement;
    expect(elFilterType.disabled).to.equal(false);
    expect(elFrequencyRange.disabled).to.equal(false);
    expect(elFrequencyNumber.disabled).to.equal(false);
  });
});
