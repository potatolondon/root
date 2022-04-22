module.exports = api => {
  const presetConf = {
    corejs: '3.18',
    useBuiltIns: 'entry',
  };

  if (api.env('test')) {
    presetConf.targets = {
      node: 'current',
    };
  }

  return {
    presets: [['@babel/preset-env', presetConf]],
    sourceType: 'unambiguous',
    plugins: [
      ['@babel/plugin-transform-runtime'],
      [
        '@babel/plugin-proposal-decorators',
        {
          decoratorsBeforeExport: true,
        },
      ],
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true,
        },
      ],
    ],
  };
};
