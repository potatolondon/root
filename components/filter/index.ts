import { audioCtx } from '../../lib/audioContext';

export class BaseFilter {
  static filterTypes = {
    lowpass: 'Lowpass',
    highpass: 'Highpass',
    // bandpass: 'Bandpass',
    // lowshelf: 'Lowshelf',
    // peaking: 'Peaking',
    // notch: 'Notch',
  };

  defaults: BiquadFilterOptions = {
    frequency: 22_050,
    gain: 0,
    Q: 1,
    type: Object.keys(BaseFilter.filterTypes)[0] as BiquadFilterType,
  };

  audioNode = new BiquadFilterNode(audioCtx, { ...this.defaults });

  constructor() {
    this.__onFrequencyChange = this.__onFrequencyChange.bind(this);
    this.__onQChange = this.__onQChange.bind(this);
    this.__onTypeChange = this.__onTypeChange.bind(this);
    this.__onGainChange = this.__onGainChange.bind(this);
  }

  __onFrequencyChange({ currentTarget }: InputEvent) {
    if (currentTarget && 'convertedValue' in currentTarget) {
      this.audioNode.frequency.setValueAtTime(
        currentTarget.convertedValue as number,
        audioCtx.currentTime
      );
    }
  }

  __onQChange({ currentTarget }: InputEvent) {
    if (currentTarget && 'valueAsNumber' in currentTarget) {
      this.audioNode.Q.setValueAtTime(
        currentTarget.valueAsNumber as number,
        audioCtx.currentTime
      );
    }
  }

  __onTypeChange({ currentTarget }: InputEvent) {
    if (currentTarget && 'value' in currentTarget) {
      this.audioNode.type = currentTarget.value as BiquadFilterType;
    }
  }

  __onGainChange({ currentTarget }: InputEvent) {
    if (currentTarget && 'valueAsNumber' in currentTarget) {
      this.audioNode.gain.value = currentTarget.valueAsNumber as number;
    }
  }
}
