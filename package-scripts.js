const { series, crossEnv, concurrent, rimraf } = require('nps-utils')
const { config: { port: E2E_PORT } } = require('./test/protractor.conf')

module.exports = {
  scripts: {
    default: 'nps webpack',
    test: {
      default: 'nps test.jest',
      jest: {
        default: 'jest',
        watch: 'jest --watch',
      },
      karma: {
        default: series(
          rimraf('test/karma-coverage'),
          'karma start test/karma.conf.js'
        ),
        watch: 'karma start test/karma.conf.js --single-run=false',
        debug: 'karma start test/karma.conf.js --single-run=false --debug'
      },
      all: concurrent({
        browser: series.nps('test.karma', 'e2e'),
        jest: 'nps test.jest',
      })
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
            'webpack --progress -d --env.config=development'
          ),
          extractCss: series(
            'nps webpack.build.before',
            'webpack --progress -d --env.extractCss, --env.config=development'
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
        default: `webpack-dev-server -d --devtool '#source-map' --inline --env.server`,
        extractCss: `webpack-dev-server -d --devtool '#source-map' --inline --env.server --env.extractCss`,
        hmr: `webpack-dev-server -d --devtool '#source-map' --inline --hot --env.server`
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
        prepare: 'cd ./cordova && ./../node_modules/.bin/cordova prepare',
        build: 'cd ./cordova && ./../node_modules/.bin/cordova build',
        clean: series(
          rimraf('./cordova/plaforms'),
          rimraf('./cordova/plugins')
        )
      }
    }
  },
}
