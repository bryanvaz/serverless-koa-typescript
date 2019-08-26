module.exports = {
    roots: ['<rootDir>/app'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      "@app/(.*)": "<rootDir>/app/$1",
      "@config/(.*)": "<rootDir>/app/config/$1",
    },
    globalSetup: '<rootDir>/app/__tests__/testSetup.ts',
    // "globalTeardown": "<rootDir>/scripts/testTeardown.js"
    collectCoverage: true,
    collectCoverageFrom: [
      'app/**/*.{ts,js}',
      '!app/config/**',
      '!**/node_modules/**',
      '!**/build/**',
      '!**/coverage/**',
    ],
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      }
    },
    coverageReporters: [
      'text',
      'text-summary',
    ],
  }