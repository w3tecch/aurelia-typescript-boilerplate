"use strict";
const core_1 = require('@easy-webpack/core');
const webpack = require('webpack');

module.exports = function LoaderOptions(initalConfig = {}, extractOptions = []) {
  return function LoaderOptions() {
    let options = {};
    extractOptions.forEach(k => {
      if (this[k]) {
        options[k] = this[k];
      }
      delete this[k];
    });
    Object.assign(initalConfig, options);
    return {
      plugins: [
        new webpack.LoaderOptionsPlugin({
          options: initalConfig
        })
      ].concat(core_1.get(this, 'plugins', []))
    };
  };
};
