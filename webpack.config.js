const path = require('path')
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const CompressionPlugin = require("compression-webpack-plugin");
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const { optimize: { CommonsChunkPlugin }, ProvidePlugin, BannerPlugin, DefinePlugin } = require('webpack')
const { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader');
const pkg = require('./package.json');

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || []
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig)

// primary config:
const outDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src/app');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const baseUrl = '/';

const cssRules = [
  { loader: 'css-loader' },
  {
    loader: 'postcss-loader',
    options: { plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions'] })] }
  },
  {
    loader: "sass-loader"
  }
]

module.exports = ({ production, server, extractCss, coverage, platform, config } = {}) => {

  const PLATFORM = platform || 'browser';
  const CONFIG = config || 'development';

  console.log('');
  console.log(chalk.yellow('➜') + ' ' + chalk.white('NODE_ENV: ') + chalk.green.bold(process.env.NODE_ENV));
  console.log(chalk.yellow('➜') + ' ' + chalk.white('CONFIG:   ') + chalk.green.bold(CONFIG));
  console.log(chalk.yellow('➜') + ' ' + chalk.white('PLATFORM: ') + chalk.green.bold(PLATFORM));
  console.log('');

  return ({
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [srcDir, 'node_modules'],
    },
    entry: {
      app: ['aurelia-bootstrapper'],
      vendor: ['bluebird', 'jquery', 'bootstrap-sass'],
    },
    output: {
      path: outDir,
      publicPath: baseUrl,
      filename: production ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
      sourceMapFilename: production ? '[name].[chunkhash].bundle.map' : '[name].[hash].bundle.map',
      chunkFilename: production ? '[name].[chunkhash].chunk.js' : '[name].[hash].chunk.js',
    },
    devServer: {
      contentBase: outDir,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader'
        },
        {
          test: /\.html$/i,
          enforce: 'pre',
          include: [srcDir],
          use: [{
            loader: 'aurelia-template-lint-webpack-loader',
            options: {
              emitErrors: production,
              failOnHint: production,
              typeChecking: true,
              reflectionOpts: {
                sourceFileGlob: './src/app/**/*.ts'
              }
            }
          }]
        },
        // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
        // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
        {
          test: /\.scss$/i,
          // issuer: [{ not: [{ test: /\.html$/i }] }],
          use: extractCss ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssRules,
          }) : ['style-loader', ...cssRules],
        },
        {
          test: /\.css$/i,
          issuer: [{ test: /\.html$/i }],
          // CSS required in templates cannot be extracted safely
          // because Aurelia would try to require it again in runtime
          use: cssRules,
        },
        {
          test: /\.html$/i, use: [{
            loader: 'html-loader',
            options: {
              minimize: production
            }
          }]
        },
        { test: /\.ts$/i, loader: 'awesome-typescript-loader', exclude: nodeModulesDir },
        { test: /\.json$/i, loader: 'json-loader' },
        // use Bluebird as the global Promise implementation:
        { test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose-loader?Promise' },
        // exposes jQuery globally as $ and as jQuery:
        { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
        // embed small images and fonts as Data Urls and larger ones as files:
        { test: /\.(png|gif|jpg|cur)$/i, use: ['url-loader?limit=8192', 'img-loader'] },
        { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
        { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
        // load these fonts normally, as files:
        { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
        ...when(coverage, {
          test: /\.[jt]s$/i, loader: 'istanbul-instrumenter-loader',
          include: srcDir, exclude: [/\.{spec,test}\.[jt]s$/i],
          enforce: 'post', options: { esModules: true },
        })
      ]
    },
    plugins: [
      new AureliaPlugin({ root: '', src: './src/app', title: pkg.title, baseUrl: '/' }),
      new ProvidePlugin({
        'Promise': 'bluebird',
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
      }),
      new TsConfigPathsPlugin(),
      new CheckerPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.ejs',
        minify: production ? {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true
        } : undefined,
        metadata: {
          title: pkg.title, server, baseUrl, description: pkg.description, version: pkg.version, author: pkg.author, platform: PLATFORM
        },
      }),
      ...when(extractCss, new ExtractTextPlugin({
        filename: production ? '[contenthash].css' : '[id].css',
        allChunks: true,
      })),
      ...when(production, new CommonsChunkPlugin({
        name: ['common']
      })),
      ...when(production, new BannerPlugin(
        ' @name           ' + pkg.title + '\n' +
        ' @description    ' + pkg.description + '\n\n' +
        ' @version        ' + pkg.version + '\n' +
        ' @author         ' + pkg.author + '\n' +
        ' @license        ' + pkg.license + '\n'
      )),
      ...when(production, new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html|css|eot|svg|ttf|woff2|woff)$/i,
        threshold: 10240,
        minRatio: 0.8
      })),
      ...when(production, new FaviconsWebpackPlugin({
        logo: path.resolve('icon.png'),
        persistentCache: true,
        inject: true,
        title: pkg.title,
        icons: { android: true, appleIcon: true, appleStartup: true, coast: false, favicons: true, firefox: true, opengraph: false, twitter: false, yandex: false, windows: false }
      })),
      new WebpackNotifierPlugin({
        title: pkg.title,
        contentImage: path.resolve('icon.png')
      }),
      new DefinePlugin({
        NAME: JSON.stringify(pkg.name),
        VERSION: JSON.stringify(pkg.version),
        PLATFORM: JSON.stringify(PLATFORM),
        CONFIG: JSON.stringify(require(path.resolve('src', 'config', `${CONFIG}.json`)))
      }),
      new CaseSensitivePathsPlugin()
    ],
  })
}
