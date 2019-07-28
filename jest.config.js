module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,js}',
      '!**/node_modules/**',
      '!**/build/**',
      '!**/coverage/**',
    ],
    // coverageThreshold: {
    //   global: {
    //     branches: 100,
    //     functions: 100,
    //     lines: 100,
    //     statements: 100,
    //   }
    // },
    coverageReporters: [
      'text',
      'text-summary',
    ],
  }