module.exports = function (wallaby) {
  return {
    // set `load: false` to all source files and tests processed by webpack
    // (except external files),
    // as they should not be loaded in browser,
    // their wrapped versions will be loaded instead
    files: [
      { pattern: 'src/app/**/*.ts', load: false }
    ],

    tests: [
      { pattern: 'test/jest-unit/**/*.test.ts', load: false }
    ],

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        typescript: require('typescript')
      })
    },

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    debug: true
  };
};
