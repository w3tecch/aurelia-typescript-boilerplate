import {Aurelia} from 'aurelia-framework';

/**
 * Main Sass file
 */
import '../styles/index.scss';

/**
 * Third Party Libraries
 */
import 'jquery';
import 'bootstrap';
import 'lodash';
import 'moment';
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

import enTranslation from './../assets/i18n/en';

/**
 * Aurelia configure
 *
 * @export
 * @param {Aurelia} aurelia
 * @returns {Promise<void>}
 */
export async function configure(aurelia: Aurelia): Promise<void> {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-i18n', (instance) => {
        // adapt options to your needs (see http://i18next.com/docs/options/)
        // make sure to return the promise of the setup method, in order to guarantee proper loading
        return instance.setup({
          resources: {
            en: enTranslation
          },
          lng : 'en',
          attributes : ['t', 'i18n'],
          fallbackLng : 'en',
          debug : false
        });
      });

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

/**
 * animated.css helper function
 */
$.fn.extend({
  animateCss: function (animationName: string): JQuery {
    let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    return $(this)
      .addClass('animated ' + animationName)
      .one(animationEnd, () => {
        $(this).removeClass('animated ' + animationName);
      });
  }
});
