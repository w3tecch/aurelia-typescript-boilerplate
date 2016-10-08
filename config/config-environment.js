"use strict";

const webpack = require('webpack');
const minimist = require('minimist')(process.argv.slice(2));

/**
 * Environment Config
 */
const configEnv = function (options) {
  return {
		plugins: [
			new webpack.DefinePlugin(getDefinitions(options.env, options.name, options.version))
		]
	};
};

function getDefinitions(env, name, version) {
  const environment = minimist.env || env;
  return {
    NAME: JSON.stringify(name),
    VERSION: JSON.stringify(version),
    CONFIG: JSON.stringify(require(process.cwd() + `/environment/${environment}.json`))
	};

}
module.exports = configEnv;
