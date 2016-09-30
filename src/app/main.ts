/**
 * Gets and defines the environment configruation
 */
declare var NAME: string;
declare var VERSION: string;
declare var CONFIG: AppConfig.IAppConfigEnv;

const AppConfig: AppConfig.IAppConfig = {
  NAME: NAME,
  VERSION: VERSION,
  CONFIG: CONFIG
};

/**
 * Main Sass file
 */
import '../styles/main.scss';

/**
 * Third Party Libraries
 */
import 'jquery';
import 'materialize-css';

/**
 * Aurelia
 */
import { Aurelia, LogManager } from 'aurelia-framework';

/**
 * Translations
 */
import enTranslation from './../assets/i18n/en';

/**
 * Extend aurelia logging
 *
 * valid entries: none, error, warn, info, debug
 */
import { ConsoleAppender } from 'aurelia-logging-console';

/**
 * Aurelia configure
 *
 * @export
 * @param {Aurelia} aurelia
 * @returns {Promise<void>}
 */
export async function configure(aurelia: Aurelia): Promise<void> {
  LogManager.addAppender(new ConsoleAppender());
  LogManager.setLevel(LogManager.logLevel[(<AppConfig.IAppConfig>AppConfig).CONFIG.LOG_LEVEL]);

  aurelia.use
    .standardConfiguration()
    /**
     * Adds the app config to the framework's dependency injection container.
     */
    .instance('AppConfig', AppConfig)

    /**
     * This enables the animation plugin for aurelia
     * See: https://github.com/aurelia/animator-css
     * See: http://blog.durandal.io/2015/07/17/animating-apps-with-aurelia-part-1/
     */
    .plugin('aurelia-animator-css')

    /**
     * i18n support
     * adapt options to your needs (see http://i18next.com/docs/options/)
     * make sure to return the promise of the setup method, in order to guarantee proper loading
     *
     * See: https://github.com/aurelia/i18n
     */
    .plugin('aurelia-i18n', (instance) => instance.setup({
      resources: {
        en: enTranslation
      },
      lng: 'en',
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    }))

    /**
     * aurelia-materialize-bridge
     *
     * See: http://aurelia-ui-toolkits.github.io/demo-materialize/#/installation
     * See: https://github.com/aurelia-ui-toolkits/aurelia-materialize-bridge
     * See: https://github.com/aurelia-ui-toolkits/demo-materialize
     */
    .plugin('aurelia-materialize-bridge', bridge => bridge.useAll())

    /**
     * Import commen things
     */
    .feature('resources/attributes')
    .feature('resources/components');

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')
  await aurelia.start();
  aurelia.setRoot('app');

  // if you would like your website to work offline (Service Worker),
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}
