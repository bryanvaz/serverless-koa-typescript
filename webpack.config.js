// eslint-disable-next-line node/no-unpublished-require
const slsw = require('serverless-webpack');
// eslint-disable-next-line node/no-unpublished-require
const nodeExternals = require('webpack-node-externals');
const resolveTsconfigPathsToAlias = require('./scripts/resolve-tsconfig-path-to-webpack-alias');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [
    nodeExternals({
      whitelist: [
        // '@babel/runtime/regenerator',
        // '@babel/runtime/helpers/asyncToGenerator',
        '@babel/runtime',
      ],
    }),
  ],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: resolveTsconfigPathsToAlias({
	    tsconfigPath: './tsconfig.json', // Using custom path
      webpackConfigBasePath: './', // Using custom path
    }),
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: __dirname,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};
