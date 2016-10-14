"use strict";

/**
 * AureliaTemplateLinter config
 */
const aureliaTemplateLinter = function (options) {
	return {
		module: {
			preLoaders: [
				{
					test: /\.html$/,
					loader: 'aurelia-template-lint-loader'
				}
			]
		},
		aureliaTemplateLinter: {
			configuration: options && options.config,

			// tslint errors are displayed by default as warnings
			// set emitErrors to true to display them as errors
			emitErrors: false,

			// tslint does not interrupt the compilation by default
			// if you want any file with tslint errors to fail
			// set failOnHint to true
			failOnHint: true,
		}
		};
};
module.exports = aureliaTemplateLinter;
