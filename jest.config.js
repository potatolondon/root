module.exports = {
  // testMatch: [
  //     './src/**/?(*.)+(spec|test).[jt]s?(x)',
  // ],
  transformIgnorePatterns: [
    'node_modules/(?!(lit|@lit|lit-html|lit-element)/)',
  ],
  testEnvironment: 'jsdom',
};
