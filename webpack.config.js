"use strict";

/**
 * To learn more about how to use Easy Webpack
 * Take a look at the README here: https://github.com/easy-webpack/core
 **/
const easyWebpack = require('@easy-webpack/core');
const generateConfig = easyWebpack.default;
const get = easyWebpack.get;
const path = require('path');
const chalk = require('chalk');

module.exports = function (envArguments) {
  let config;
  const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
  const pkg = require(path.join(process.cwd(), 'package.json'));
  let PLATFORM = 'web';
  let TARGET = 'development';
  if (envArguments) {
    PLATFORM = envArguments.platform || PLATFORM;
    TARGET = envArguments.target || TARGET;
  }
  console.log('');
  console.log(chalk.yellow('➜') + ' ' + chalk.white('NODE_ENV: ') + chalk.green.bold(ENV));
  console.log(chalk.yellow('➜') + ' ' + chalk.white('ENV:      ') + chalk.green.bold(TARGET));
  console.log(chalk.yellow('➜') + ' ' + chalk.white('PLATFORM: ') + chalk.green.bold(PLATFORM));
  console.log('');
  //-- -- --env.target development
  //-- -- --env.platform mobile

  // basic configuration:
  const title = pkg.title;
  const baseUrl = '/';
  const rootDir = path.resolve();
  const srcDir = path.resolve('src/app');
  const outDir = path.resolve('dist');
  const faviconPath = 'src/assets/images/favicon.ico';

  // context to fill the index file
  const metadata = {
    title: pkg.title,
    description: pkg.description,
    version: pkg.version,
    author: pkg.author,
    baseUrl: baseUrl,
    env: TARGET,
    platform: PLATFORM,
    root: rootDir
  };

  const coreBundles = {
    bootstrap: [
      'aurelia-bootstrapper-webpack',
      'aurelia-polyfills',
      'aurelia-pal',
      'aurelia-pal-browser',
      'regenerator-runtime',
      'intl'
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
      'aurelia-templating-resources'
    ],
    theme: [
      'bootstrap-sass'
    ]
  }

  const baseConfig = {
    entry: {
      'app': [ /* this is filled by the aurelia-webpack-plugin */ ],
      'theme': coreBundles.theme,
      'aurelia-bootstrap': coreBundles.bootstrap,
      'aurelia': coreBundles.aurelia.filter(pkg => coreBundles.bootstrap.indexOf(pkg) === -1)
    },
    output: {
      path: outDir,
    }
  };

  const configAurelia = {
    root: rootDir,
    src: srcDir,
    title: title,
    baseUrl: baseUrl
  };

  const configEnvironment = {
    target: TARGET,
    name: pkg.name,
    version: pkg.version,
    platform: PLATFORM,
    env: TARGET
  };

  const configCommonChunks = {
    appChunkName: 'app',
    firstChunk: 'aurelia-bootstrap'
  };

  const configGenerateIndex = (minify) => {
    return {
      minify: minify,
      overrideOptions: Object.assign({
        template: './src/index.ejs'
      }, metadata)
    };
  };

  const configNotifier = {
    title: metadata.title,
    contentImage: path.resolve(faviconPath)
  };

  const configSass = (sourceMap) => {
    return {
      allChunks: true,
      sourceMap: sourceMap
    };
  };

  const configFavicon = {
    title: metadata.title,
    logo: path.resolve(faviconPath)
  };

  const banner = {
    title: pkg.title,
    description: pkg.description,
    version: pkg.version,
    author: pkg.author,
    license: pkg.license
  };

  const copyLocales = {
    patterns: [{
      from: 'src/locales',
      to: 'locales'
    }]
  };

  // advanced configuration:
  switch (ENV) {
    /**
     * PRODUCTION
     */
    case 'production':
      config = generateConfig(
        baseConfig,
        require('@easy-webpack/config-env-production')
        ({
          compress: true
        }),
        require('@easy-webpack/config-common-chunks-simple')(configCommonChunks),
        require('@easy-webpack/config-aurelia')(configAurelia),
        require('@easy-webpack/config-tslint')(),
        require('@easy-webpack/config-typescript')(),
        require('@easy-webpack/config-html')(),
        require('@easy-webpack/config-sass')(configSass(false)),
        require('@easy-webpack/config-fonts-and-images')(),
        require('@easy-webpack/config-global-jquery')(),
        require('@easy-webpack/config-global-regenerator')(),
        require('@easy-webpack/config-generate-index-html')(configGenerateIndex(true)),
        require('@easy-webpack/config-copy-files')(copyLocales),
        require('@easy-webpack/config-uglify')
        ({
          debug: false
        }),
        require('./config/config-globals.js')(),
        require('./config/config-favicon.js')(configFavicon),
        require('./config/config-environment.js')(configEnvironment),
        require('./config/config-notifier.js')(configNotifier),
        require('./config/config-banner')(banner),
        require('./config/config-gzip')()
      );
      break;
      /**
       * TEST
       */
    case 'test':
      config = generateConfig(
        baseConfig,
        require('@easy-webpack/config-env-development')
        ({
          devtool: 'inline-source-map'
        }),
        require('@easy-webpack/config-aurelia')(configAurelia),
        // require('@easy-webpack/config-tslint')(),
        require('@easy-webpack/config-typescript')
        ({
          options: {
            doTypeCheck: false,
            compilerOptions: {
              sourceMap: false,
              inlineSourceMap: true
            }
          }
        }),
        require('@easy-webpack/config-json')(),
        require('@easy-webpack/config-global-jquery')(),
        require('@easy-webpack/config-global-regenerator')(),
        require('@easy-webpack/config-test-coverage-istanbul')(),
        require('./config/config-environment.js')(configEnvironment),
        require('./config/config-ignore.js')(),
        require('./config/config-notifier.js')(configNotifier)
      );
      break;

      /**
       * DEVELOPMENT
       */
    default:
    case 'development':
      process.env.NODE_ENV = 'development';
      config = generateConfig(
        baseConfig,
        require('@easy-webpack/config-env-development')(),
        require('@easy-webpack/config-common-chunks-simple')(configCommonChunks),
        require('@easy-webpack/config-aurelia')(configAurelia),
        require('@easy-webpack/config-tslint')(),
        require('@easy-webpack/config-typescript')(),
        require('@easy-webpack/config-html')(),
        require('@easy-webpack/config-json')(),
        require('@easy-webpack/config-sass')(configSass(true)),
        require('@easy-webpack/config-fonts-and-images')(),
        require('@easy-webpack/config-global-jquery')(),
        require('@easy-webpack/config-global-regenerator')(),
        require('@easy-webpack/config-generate-index-html')(configGenerateIndex(false)),
        require('@easy-webpack/config-copy-files')(copyLocales),
        require('./config/config-environment.js')(configEnvironment),
        require('./config/config-globals.js')(),
        require('./config/config-favicon.js')(configFavicon),
        require('./config/config-notifier.js')(configNotifier)
      );
      break;
  }

  return config;
};
