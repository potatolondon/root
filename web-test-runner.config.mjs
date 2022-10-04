import { esbuildPlugin } from '@web/dev-server-esbuild';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';

export default {
  browsers: [
    puppeteerLauncher({
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    }),
  ],
  files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
  plugins: [esbuildPlugin({ ts: true })],
};
