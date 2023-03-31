# \<web-audio>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i
```

## Usage

```html
<script type="module">
  import 'web-audio/web-audio.js';
</script>

<web-audio></web-audio>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the app located in `/index.html`

# Building and deploying

To build the project for production, run

```bash
npm run build
```

To build the project and deploy it to App Engine, run

```bash
npm run deploy
```

Once deployed, the production version uses the app located in `/index.html` but serves built assets from the `/dist/` folder.
