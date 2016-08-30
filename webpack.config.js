"use strict";

/**
 * To learn more about how to use Easy Webpack
 * Take a look at the README here: https://github.com/easy-webpack/core
 **/
const webpack = require('webpack');
const easyWebpack = require('@easy-webpack/core');
const generateConfig = easyWebpack.default;
const get = easyWebpack.get;
const path = require('path');
const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
const pkg = require(path.join(process.cwd(), 'package.json'));
const argv = require('minimist')(process.argv.slice(2));

/**
 * Other libraries
 */
const autoprefixer = require('autoprefixer');

// basic configuration:
const title = pkg.title;
const baseUrl = '/';
const rootDir = path.resolve();
const srcDir = path.resolve('src/app');
const outDir = path.resolve('dist');
argv.env = (argv.env === true ? 'development' : argv.env) || 'development';
let config;

const coreBundles = {
  bootstrap: [
    'aurelia-bootstrapper-webpack',
    'aurelia-polyfills',
    'aurelia-pal',
    'aurelia-pal-browser',
    'regenerator-runtime',
    'bluebird'
  ],
  // these will be included in the 'aurelia' bundle (except for the above bootstrap packages)
  aurelia: [
    'aurelia-bootstrapper-webpack',
    'aurelia-binding',
    'aurelia-dependency-injection',
    'aurelia-event-aggregator',
    'aurelia-framework',
    'aurelia-history',
    'aurelia-history-browser',
    'aurelia-loader',
    'aurelia-loader-webpack',
    'aurelia-logging',
    'aurelia-logging-console',
    'aurelia-metadata',
    'aurelia-pal',
    'aurelia-pal-browser',
    'aurelia-path',
    'aurelia-polyfills',
    'aurelia-route-recognizer',
    'aurelia-router',
    'aurelia-task-queue',
    'aurelia-templating',
    'aurelia-templating-binding',
    'aurelia-templating-router',
    'aurelia-templating-resources',
    'aurelia-i18n'
  ]
};

const baseConfig = {
  entry: {
    'app': [/* this is filled by the aurelia-webpack-plugin */],
    'aurelia-bootstrap': coreBundles.bootstrap,
    'aurelia': coreBundles.aurelia.filter(pkg => coreBundles.bootstrap.indexOf(pkg) === -1),
  },
  output: {
    path: outDir,
  }
};

/**
 * Metadata
 */
const metadata = {
  title: pkg.title,
  description: pkg.description,
  version: pkg.version,
  author: pkg.author,
  baseUrl: baseUrl,
  root: rootDir
};

// advanced configuration:
switch (ENV) {
  case 'production':
    let banner = {
      title: pkg.title,
      description: pkg.description,
      version: pkg.version,
      author: pkg.author,
      license: pkg.license
    }

    config = generateConfig(
      baseConfig,

      require('@easy-webpack/config-env-production')
        ({ compress: true }),

      require('@easy-webpack/config-aurelia')
        ({ root: rootDir, src: srcDir, title: title, baseUrl: baseUrl }),

      require('@easy-webpack/config-typescript')(),
      require('@easy-webpack/config-html')(),

      require('@easy-webpack/config-sass')
        ({ allChunks: true, sourceMap: false }),

      require('./config/config-environment.js')
        ({ env: argv.env, name: pkg.name, version: pkg.version }),

      require('./config/config-notifier.js')
        (metadata.title, { contentImage: path.resolve('src/assets/images/favicon.ico') }),

      require('./config/config-globals.js')(),
      require('@easy-webpack/config-fonts-and-images')(),
      require('@easy-webpack/config-global-bluebird')(),
      require('@easy-webpack/config-global-jquery')(),
      require('@easy-webpack/config-global-regenerator')(),
      require('@easy-webpack/config-generate-index-html')
        ({
          minify: true, overrideOptions: Object.assign({
            template: './src/index.ejs'
          }, metadata)
        }),
      require('@easy-webpack/config-json')(),

      require('@easy-webpack/config-common-chunks-simple')
        ({ appChunkName: 'app', firstChunk: 'aurelia-bootstrap' }),

      require('./config/config-favicon.js')
        (metadata.title,  path.resolve('src/assets/images/favicon.ico')),

      require('@easy-webpack/config-uglify')
        ({ debug: false }),

      require('./config/config-banner')(banner)
    );
    break;

  case 'test':
    config = generateConfig(
      baseConfig,

      require('@easy-webpack/config-env-development')
        ({ devtool: 'inline-source-map' }),

      require('@easy-webpack/config-aurelia')
        ({ root: rootDir, src: srcDir, title: title, baseUrl: baseUrl }),

      require('@easy-webpack/config-typescript')
        ({ options: { doTypeCheck: false, compilerOptions: { sourceMap: false, inlineSourceMap: true } } }),

      require('@easy-webpack/config-html')(),

      require('@easy-webpack/config-sass')
        ({ allChunks: true, sourceMap: false }),

      require('./config/config-environment.js')
        ({ env: argv.env, name: pkg.name, version: pkg.version }),

      require('./config/config-notifier.js')
        (metadata.title, { contentImage: path.resolve('src/assets/images/favicon.ico') }),

      require('@easy-webpack/config-fonts-and-images')(),
      require('@easy-webpack/config-global-bluebird')(),
      require('@easy-webpack/config-global-jquery')(),
      require('@easy-webpack/config-global-regenerator')(),
      require('@easy-webpack/config-generate-index-html')
        ({
          minify: true, overrideOptions: Object.assign({
            template: './src/index.ejs'
          }, metadata)
        }),

      require('./config/config-favicon.js')
        (metadata.title,  path.resolve('src/assets/images/favicon.ico'))//,

      //require('@easy-webpack/config-test-coverage-istanbul')() // doesn't work currently with webpack 2'
    );
    break;

  default:
  case 'development':
    process.env.NODE_ENV = 'development';
    config = generateConfig(
      baseConfig,

      require('@easy-webpack/config-env-development')(),

      require('@easy-webpack/config-aurelia')
        ({ root: rootDir, src: srcDir, title: title, baseUrl: baseUrl }),

      require('@easy-webpack/config-tslint')(),
      require('@easy-webpack/config-typescript')
        ({ exclude: [/\.(spec|e2e|async)\.ts$/] }),

      require('@easy-webpack/config-html')(),
      require('@easy-webpack/config-json')(),

      require('@easy-webpack/config-sass')
        ({ allChunks: true, sourceMap: false }),

      require('./config/config-environment.js')
        ({ env: argv.env, name: pkg.name, version: pkg.version }),

      require('./config/config-notifier.js')
        (metadata.title, { contentImage: path.resolve('src/assets/images/favicon.ico') }),

      require('./config/config-globals.js')(),
      require('@easy-webpack/config-fonts-and-images')(),
      require('@easy-webpack/config-global-bluebird')(),
      require('@easy-webpack/config-global-jquery')(),
      require('@easy-webpack/config-global-regenerator')(),
      require('@easy-webpack/config-generate-index-html')
        ({
          minify: false, overrideOptions: Object.assign({
            template: './src/index.ejs'
          }, metadata)
        }),

      require('./config/config-favicon.js')
        (metadata.title,  path.resolve('src/assets/images/favicon.ico')),

      require('@easy-webpack/config-common-chunks-simple')
        ({ appChunkName: 'app', firstChunk: 'aurelia-bootstrap' }),

      require('./config/config-node.js')()
    );
    break;
}

module.exports = config;
