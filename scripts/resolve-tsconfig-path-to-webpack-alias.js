const fs = require('fs');
const { resolve } = require('path');
const JSON5 = require('json5')

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @param  {string} tsconfigPath           - Path to tsconfig
 * @param  {string} webpackConfigBasePath  - Relative base path from tsconfig to Webpack config to create absolute aliases
 * @return {object}                        - Webpack alias config
 */
function resolveTsconfigPathsToAlias({
    tsconfigPath = './tsconfig.json',
    webpackConfigBasePath = './'} = {},
) {
    const { paths } = JSON5.parse(fs.readFileSync(tsconfigPath).toString()).compilerOptions

    const aliases = {};

    Object.keys(paths).forEach((item) => {
        const key = item.replace('/*', '');
        const value = resolve(webpackConfigBasePath, paths[item][0].replace('/*', ''));

        aliases[key] = value;
    });

    return aliases;
}

module.exports = resolveTsconfigPathsToAlias;
