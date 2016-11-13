"use strict";
const webpack = require('webpack');

/**
 * AureliaTemplateLinter config
 */
const aureliaTemplateLinter = function (options) {
  return {
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.html$/,
          loader: 'aurelia-template-lint-loader'
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          aureliaTemplateLinter: {
            configuration: options && options.config,

            // aurelia errors are displayed by default as warnings
            // set emitErrors to true to display them as errors
            emitErrors: false,

            // aurelia does not interrupt the compilation by default
            // if you want any file with aurelia errors to fail
            // set failOnHint to true
            failOnHint: options.failOnHint,

            typeChecking: options.typeChecking,
            fileGlob: options.sourceDir
          }
        }
      })
    ]
  };
};

module.exports = aureliaTemplateLinter;
