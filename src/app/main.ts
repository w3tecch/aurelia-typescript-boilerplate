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
 * Import the main sass file for all the styles
 */
import '../scss/main.scss';

/**
 * Aurelia imports
 */
import { Aurelia, LogManager } from 'aurelia-framework';
import { ConsoleAppender } from 'aurelia-logging-console';

/**
 * Locals i18n imports
 */
import i18nEnglish from './../locales/en.json';

/**
 * Aurelia configruation
 */
export async function configure(aurelia: Aurelia): Promise<void> {
  LogManager.addAppender(new ConsoleAppender());
  LogManager.setLevel(LogManager.logLevel[(<AppConfig.IAppConfig>AppConfig).CONFIG.LOG_LEVEL]);
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
		/**
		 * Adds the app config to the framework's dependency injection container.
		 */
    .instance('AppConfig', AppConfig)
    /**
     * i18n support
     * adapt options to your needs (see http://i18next.com/docs/options/)
     * make sure to return the promise of the setup method, in order to guarantee proper loading
     *
     * See: https://github.com/aurelia/i18n
     */
    .plugin('aurelia-i18n', (instance) => {
      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        resources: {
          en: {
            translation:  i18nEnglish
          }
        },
        lng: 'en',
        attributes: ['translate', 'i18n'],
        fallbackLng: 'en',
        debug: false
      });
    })
    // Uncomment the line below to enable animation.
    // .plugin('aurelia-animator-css');
    // if the css animator is enabled, add swap-order="after" to all router-view elements

    // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    // .plugin('aurelia-html-import-template-loader')
		/**
		 * Features
		 */
    .feature('resources/attributes')
    .feature('resources/elements')
    ;

  await aurelia.start();
  aurelia.setRoot('app');

  // if you would like your website to work offline (Service Worker),
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}
