import { puppeteerLauncher } from '@web/test-runner-puppeteer';

export default {
  browsers: [
    puppeteerLauncher({
      launchOptions: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    }),
  ],
};