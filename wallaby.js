module.exports = function (wallaby) {
  return {
    files: [
      'tsconfig.json',
      'src/app/**/*.ts',
      'src/**/*.json',
    ],

    tests: [
      'test/jest-unit/**/*.test.ts'
    ],

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        module: 'commonjs'
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
