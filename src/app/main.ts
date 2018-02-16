/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
/**
 * Import the main sass file for all the styles
 */
import '../scss/main.scss';

/**
 * App configuration import
 */
import { AppConfigService } from './services/app-config.service';
const appConfigService = new AppConfigService();

/**
 * Aurelia imports
 */
import { Aurelia, LogManager, PLATFORM } from 'aurelia-framework';
import { ConsoleAppender } from 'aurelia-logging-console';
import { ValidationMessageProvider } from 'aurelia-validation';
import { Expression } from 'aurelia-binding';
import { I18N } from 'aurelia-i18n';

/**
 * Locals i18n imports
 */
import en_USTranslation from './../locales/en_US.json';
import de_CHTranslation from './../locales/de_CH.json';

/**
 * Third Party Libraries and polyfill
 */
import 'isomorphic-fetch';
import LanguageDetector from 'i18next-browser-languagedetector';

/**
 * Polyfills
 */
import 'reflect-metadata';
import 'utils/polyfills.utils';

// Fontawesome setup
import fontawesome from '@fortawesome/fontawesome';
import fontawesomeSolid from '@fortawesome/fontawesome-free-solid';
fontawesome.library.add(fontawesomeSolid);

import * as Bluebird from 'bluebird';
// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

/**
 * Aurelia configruation
 */
export async function configure(aurelia: Aurelia): Promise<void> {
  LogManager.addAppender(new ConsoleAppender());
  LogManager.setLevel(LogManager.logLevel[appConfigService.getConfig().LOG_LEVEL]);

  aurelia.use
    .standardConfiguration()
    /**
     * i18n support
     * adapt options to your needs (see http://i18next.com/docs/options/)
     * make sure to return the promise of the setup method, in order to guarantee proper loading
     *
     * See: https://github.com/aurelia/i18n
     */
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      instance.i18next.use(LanguageDetector);
      // adapt options to your needs (see http://i18next.com/docs/options/)
      // make sure to return the promise of the setup method, in order to guarantee proper loading
      return instance.setup({
        resources: {
          'en-US': {
            translation: en_USTranslation
          },
          'de-CH': {
            translation: de_CHTranslation
          }
        },
        fallbackLng: {
          'de': ['de-CH', 'en-US'],
          'de-DE': ['de-CH', 'en-US'],
          'default': ['en-US']
        },
        lng: 'en-US',
        debug: false,
        detection: {
          order: ['localStorage', 'navigator'],
          lookupCookie: 'i18next',
          lookupLocalStorage: 'i18nextLng',
          caches: ['localStorage']
        }
      });
    })
    /**
     * Aurelia Validation plugin
     * See: https://github.com/aurelia/validation
     *
     * Configure i18n for aurelia-validation error messages.
     * See: http://aurelia.io/hub.html#/doc/article/aurelia/validation/latest/validation-basics
     */
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    // Uncomment the line below to enable animation.
    .plugin(PLATFORM.moduleName('aurelia-animator-css'))
    // if the css animator is enabled, add swap-order="after" to all router-view elements

    .plugin(PLATFORM.moduleName('aurelia-dialog'), config => {
      config.useDefaults();
      config.settings.startingZIndex = 1005;
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
    })

    // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    // .plugin('aurelia-html-import-template-loader')
		/**
		 * Features
		 */
    .feature(PLATFORM.moduleName('resources/attributes/index'))
    .feature(PLATFORM.moduleName('resources/elements/index'))
    .feature(PLATFORM.moduleName('resources/templates/index'))
    .feature(PLATFORM.moduleName('resources/converters/index'))
    ;

  /**
   * If we are on Cordova we have to wait until the device is ready.
   * Removing this could cause breaking Cordova Plugins
   */
  await new Promise(resolve => appConfigService.platformIsMobile()
    ? document.addEventListener('deviceready', () => resolve(), false)
    : resolve());

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app.vm'));

  // if you would like your website to work offline (Service Worker),
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */

  // Configure validation translations
  ValidationMessageProvider.prototype.getMessage = function (key): Expression {
    const i18n = aurelia.container.get(I18N);
    const translationId = `VALIDATIONS.${key}`;
    let translation = i18n.tr(translationId);
    if (translation === translationId) {
      translation = i18n.tr(key);
    }
    return (this as any).parser.parse(translation);
  };
  ValidationMessageProvider.prototype.getDisplayName = function (...args): string {
    const i18n = aurelia.container.get(I18N);
    return i18n.tr(args[1]);
  };
}
