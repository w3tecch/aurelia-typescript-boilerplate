// Wallaby.js configuration

// https://github.com/wallabyjs/public/issues/726
var Module              = require( 'module' ).Module;
var modulePrototype     = Module.prototype;
var originalRequire     = modulePrototype.require;
modulePrototype.require = function ( filePath ) {
    if ( filePath === 'source-map-support' ) {
        return { install: () => {} };
    }
    return originalRequire.call( this, filePath );
};

process.env.NODE_ENV = 'test';
var webpackConfig = require('./webpack.config')();

modulePrototype.require = originalRequire;

//webpackConfig.resolve.extensions = ['', '.js'];
webpackConfig.devtool = 'source-map';

// Cleaning it
delete webpackConfig.entry;
delete webpackConfig.devServer;
delete webpackConfig.resolve.root;
webpackConfig.module.rules.shift();
webpackConfig.plugins = webpackConfig.plugins.filter(p => !p.getPath);
webpackConfig.module.rules = webpackConfig.module.rules.filter(r => r.enforce !== 'post');

var wallabyWebpack = require('wallaby-webpack');
var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
  return {
    // set `load: false` to all source files and tests processed by webpack
    // (except external files),
    // as they should not be loaded in browser,
    // their wrapped versions will be loaded instead
    files: [
      {pattern: 'src/app/**/*.ts', load: false},
      {pattern: 'src/**/*.json', load: false},
      {pattern: 'test/lib/setup.ts', load: false},
    ],

    tests: [
      {pattern: 'test/unit/**/*.spec.ts', load: false}
    ],

    postprocessor: wallabyPostprocessor,

    setup: function () {
      // required to trigger test loading
      window.__moduleBundler.loadTests();
    },

    env: {
      kind: 'electron'
    },

    debug: true
  };
};
