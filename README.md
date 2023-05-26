# Root (Alpha release)

![](https://github.com/potatolondon/root/blob/main/images/hero.webp?raw=true)

## Overview

Root is a library of web components that provide an intuitive framework for experimenting with synthesised sound by leveraging the Web Audio API. Root is built with modularity at its core; individual components, such as different controls (eg. faders and buttons), can be combined to create modules, which in return can be combined together to create instruments and other tools for sonic experimentation and expression.

Root is an open-source project created by Potato Labs, an innovation hub at the digital product studio [Potato](https://p.ota.to).

## Quick start

### Try the demo

[Try the Root demo here.](https://potato-synth.appspot.com)

[Try the Storybook documentation here.](https://potatolondon.github.io/root/)

### Installation

__TBC__

```bash
npm install
```

### Running the demo locally

Root comes with a demo that you can run on a local development server that serves the app located in `/demo/index.html`

```bash
npm start
```

## Modules

![](https://github.com/potatolondon/root/blob/main/images/multi-wave-oscillator.webp?raw=true)

### Multi-wave oscillator module

This module provides the ability to generate and mix four classic waveshapes: sine, saw, square and triangle with a global detune control.

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

![](https://github.com/potatolondon/root/blob/main/images/dual-filter.webp?raw=true)

### Dual filter module

Simple filter module that can be switched between lowpass and highpass modes, with controls for cutoff frequency, resonance and boost.

![](https://github.com/potatolondon/root/blob/main/images/single-wave-oscillator.webp?raw=true)

### Single-wave oscillator module

Stripped down version of the multi-wave oscillator module that provides the functionality to generate a single waveform, coupled with a detune control with user-definable range and latch mechanism.

![](https://github.com/potatolondon/root/blob/main/images/keyboard.webp?raw=true)

### Keyboard module

A straightforward MIDI input device enabling the user to play using the corresponding keys on their QWERTY keyboard or by using the mouse to control the on-screen keyboard.

## Building with Root

### Usage

__TBC__

```html
<script type="module"
  import Synth from '@potato/root/components/synth';
</script>

<root-synth></root-synth>
```

### Signal routing

Routing audio to and from Root modules is inspired by conventional modular synthesisers. You can generate “virtual cables” between different Root modules by using the `sendTo` and `receiveFrom` attributes.

#### Example

The example below demonstrates a simple setup where the output of the oscillator module is routed into the filter, which then sends the signal to the main output, allowing the resulting audio to be heard through the system’s output (eg. speakers or headphones).

```html
<root-connect>
  <root-osc id="osc-1" sendTo="filter-1"></root-osc>
  <root-filter
    id="filter-1"
    sendTo="output"
    recieveFrom="osc-1"
  ></root-filter>
</root-connect>
```

### Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

### Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

### Building and deploying

To build the project for production, run

```bash
npm run build
```

To build the project and deploy it to App Engine, run

```bash
npm run deploy
```

Once deployed, the production version uses the app located in `/index.html` but serves built assets from the `/dist/` folder.

## Get involved!

__TBC__
