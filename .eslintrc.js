module.exports =  {
  parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
  plugins: ['jest'],
  extends:  [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'airbnb-typescript/base',
  ],
 parserOptions:  {
    ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
    sourceType:  'module',  // Allows for the use of imports
  },
  rules:  {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'import/prefer-default-export': 0, // Too strict.
    'max-len': ['error', { code: 144 }],
    '@typescript-eslint/interface-name-prefix': 0, // the leading 'I' helps differentiate interfaces 
    'implicit-arrow-linebreak': 0, // Arrow line breaks are important for chained promises
  },
  env: {
    'jest/globals': true,
  },
  overrides: [
    { // Jest-specific overrides
      files: ["*.spec.ts", "*.test.ts"], // Or *.test.js
      rules: {
        // "require-jsdoc": "off"
        '@typescript-eslint/explicit-function-return-type': 0, // Jest functions do not return stuff
      }
    }
  ],
};