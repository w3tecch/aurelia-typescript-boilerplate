import { Lazy, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';

import { AppConfigService } from './services/app-config.service';
import { CordovaService } from './services/cordova.service';
import { EventBusService, EventBusEvents } from './services/event-bus.service';
import { LanguageService } from './services/language.service';

@inject(I18N, AppConfigService, Lazy.of(CordovaService), EventBusService, LanguageService)
export class AppViewModel {
  public router: Router;

  constructor(
    private i18n: I18N,
    private appConfigService: AppConfigService,
    private cordovaServiceFn: () => CordovaService,
    private eventBusService: EventBusService,
    private languageService: LanguageService,
  ) { }

  public configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = this.i18n.tr('TITLE');
    if (this.appConfigService.platformIsBrowser()) {
      config.options.pushState = true;
    }
    if (this.appConfigService.platformIsMobile()) {
      this.cordovaServiceFn();
    }
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: './modules/welcome/welcome.vm',
        nav: true,
        title: 'Welcome'
      },
      {
        route: 'users',
        name: 'users',
        moduleId: './modules/users/users.vm',
        nav: true,
        title: 'Github Users'
      },
      {
        route: 'child-router',
        name: 'child-router',
        moduleId: './modules/child-router/child-router.vm',
        nav: true,
        title: 'Child Router'
      }
    ]);
    config.mapUnknownRoutes({ route: '', redirect: '' });

    this.router = router;
  }

  private configureMoment(): void {
    const locale = this.languageService.getCurrentLocale();
    moment.locale(locale);
    this.eventBusService.addSubscription(EventBusEvents.IDS.i18n.locale.changed, (a) => moment.locale(a.newValue));
  }
}
