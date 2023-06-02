# Root (Alpha release)

![](https://github.com/potatolondon/root/blob/main/images/hero.webp?raw=true)

## Overview

Root is a library of web components that provide an intuitive framework for experimenting with synthesised sound by leveraging the Web Audio API. Root is built with modularity at its core; individual components, such as different controls (eg. faders and buttons), can be combined to create modules, which in return can be combined together to create instruments and other tools for sonic experimentation and expression.

Root is an open-source project created by Potato Labs, an innovation hub at the digital product studio [Potato](https://p.ota.to).

## Quick start

### Try the demo

[Read the Storybook documentation here.](https://potatolondon.github.io/root/)

[Try the Root demo here.](https://potatolondon.github.io/root/?path=/story/demos-synth--basic)

### Install Root

To use Root in your project, first install it with npm.

```bash
npm install @potato/root
```

Next, import the components you want to use in your project. For example, the following imports and displays the Synth component.

```html
<script type="module">
  import '@potato/root/components/synth';
</script>

<root-synth></root-synth>
```

See the **[Build with Root](#build-with-root)** section below for tips on how to get started.

### Run the demo locally

Root comes with a demo that you can run locally. This is a great way to see how components work together before using Root in your own project.****

To try this out, first clone this repository, then use npm to install the dependencies and start the development server.

```bash
git clone https://github.com/potatolondon/root.git root
cd root
npm install
npm start
```

## Modules

- [Multi-wave oscillator module](https://potatolondon.github.io/root/?path=/story/components-oscillator--oscillator-module)
- [Dual filter module](https://potatolondon.github.io/root/?path=/story/components-filter--basic)
- [Single-wave oscillator module](https://potatolondon.github.io/root/?path=/story/components-oscillator--basic)
- [Keyboard module](https://potatolondon.github.io/root/?path=/story/components-keyboard--basic)

## Build with Root

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

## Get involved

Contributing to Root is easy. Check the [open issues](https://github.com/potatolondon/root/issues) – bugs and features labelled with *[good first issue](https://github.com/potatolondon/root/labels/good%20first%20issue)* are suitable for newcomers. Make sure to follow the linting and formatting guidelines below, and generate a build to test your changes. When you are ready, create a [pull request](https://github.com/potatolondon/root/compare) and one of the team will review your work.

### Lint and format

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

### Test and build

All components in Root come with tests. To run the whole test suite, run

```bash
npm test
```

As well as running the tests, it’s also useful to create a production build to check your work. To do this, run

```bash
npm run build
```
