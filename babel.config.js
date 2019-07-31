module.exports = (api) => {
  const plugins = ['source-map-support', '@babel/plugin-transform-runtime'];
  api.cache.never();
  const presets = [
    [
      '@babel/preset-env',
      {
        debug: false,
        targets: {
          node: '8.10',
        },
        useBuiltIns: false,
        modules: 'commonjs',
        loose: true,
        // shippedProposals: true,
      },
    ],
  ];

  return {
    comments: true,
    sourceMaps: 'both',
    presets,
    plugins,
  };
};
