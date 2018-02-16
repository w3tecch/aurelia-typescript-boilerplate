const { series, crossEnv, concurrent, rimraf, ifWindows } = require('nps-utils');
const { config: { port: E2E_PORT } } = require('./test/protractor.conf');

module.exports = {
  scripts: {
    default: 'nps webpack',
    test: {
      default: series(
        rimraf('test/coverage-jest'),
        'jest'
      ),
      watch: 'jest --watch'
    },
    e2e: {
      default: concurrent({
        webpack: `webpack-dev-server --inline --port=${E2E_PORT}`,
        protractor: 'nps e2e.whenReady',
      }) + ' --kill-others --success first',
      protractor: {
        install: 'webdriver-manager update',
        default: series(
          'nps e2e.protractor.install',
          'protractor test/protractor.conf.js'
        ),
        debug: series(
          'nps e2e.protractor.install',
          'protractor test/protractor.conf.js --elementExplorer'
        ),
      },
      whenReady: series(
        `wait-on --timeout 120000 http-get://localhost:${E2E_PORT}/index.html`,
        'nps e2e.protractor'
      ),
    },
    build: 'nps webpack.build',
    webpack: {
      default: 'nps webpack.server',
      build: {
        before: rimraf('dist'),
        default: 'nps webpack.build.production',
        development: {
          default: series(
            'nps webpack.build.before',
            'webpack --progress -d --env.extractCss --env.config=development'
          ),
          inlineCss: series(
            'nps webpack.build.before',
            'webpack --progress -d --env.config=development'
          ),
          serve: series.nps(
            'webpack.build.development',
            'serve'
          ),
        },
        production: {
          inlineCss: series(
            'nps webpack.build.before',
            'webpack --progress -p --env.production --env.config=production'
          ),
          default: series(
            'nps webpack.build.before',
            'webpack --progress -p --env.production --env.extractCss --env.config=production'
          ),
          serve: series.nps(
            'webpack.build.production',
            'serve'
          ),
        }
      },
      server: {
        default: `webpack-dev-server -d --inline --env.server --env.extractCss`,
        inlineCss: `webpack-dev-server -d --inline --env.server`,
        hmr: `webpack-dev-server -d --inline --hot --env.server`
      },
    },
    serve: 'http-server dist --cors --gzip',
    mobile: {
      default: 'nps mobile.build',
      link: 'node ./scripts/mobile-link.js',
      setup: series(
        'node ./scripts/mobile-setup.js',
        'nps mobile.link'
      ),
      build: {
        default: 'nps mobile.build.development',
        before: 'nps mobile.cordova.clean',
        after: series(
          'nps mobile.link',
          'nps mobile.cordova.prepare',
          'nps mobile.cordova.build'
        ),
        development: series(
          'nps mobile.build.before',
          'nps "webpack.build.development --env.platform=mobile"',
          'nps mobile.build.after'
        ),
        production: series(
          'nps mobile.build.before',
          'nps "webpack.build.production --env.platform=mobile"',
          'nps mobile.build.after'
        ),
      },
      cordova: {
        prepare: ifWindows(
          'cd .\\cordova && .\\..\\node_modules\\.bin\\cordova prepare',
          'cd ./cordova && ./../node_modules/.bin/cordova prepare'
        ),
        build: ifWindows(
          'cd .\\cordova && .\\..\\node_modules\\.bin\\cordova build',
          'cd ./cordova && ./../node_modules/.bin/cordova build'
        ),
        clean: series(
          rimraf('./cordova/platforms'),
          rimraf('./cordova/plugins')
        ),
        addbowser: ifWindows(
          'cd .\\cordova && .\\..\\node_modules\\.bin\\cordova platform add browser',
          'cd ./cordova && ./../node_modules/.bin/cordova platform add browser'
        ),
      }
    }
  },
}
