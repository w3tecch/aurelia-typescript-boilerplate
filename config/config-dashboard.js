"use strict";

/**
 * Webpack Plugins
 */
const DashboardPlugin = require('webpack-dashboard/plugin');

/**
 * Dashboard config
 */
const configDashboard = function (options) {
  return {
		plugins: [
			new DashboardPlugin()
		]
		};
};
module.exports = configDashboard;
