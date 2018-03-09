import { Lazy, inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import { HttpClient } from 'aurelia-fetch-client';
import moment from 'moment';

import { LogManager, Logger} from './services/logger.service';
import { AppConfigService } from './services/app-config.service';
import { CordovaService } from './services/cordova.service';
import { EventBusService, EventBusEvents } from './services/event-bus.service';
import { LanguageService } from './services/language.service';
import { ExampleStep } from './piplines/example.step';
import { RouteGeneratorService } from './services/route-generator.service';

@inject(I18N, AppConfigService, Lazy.of(CordovaService), EventBusService, LanguageService, HttpClient, RouteGeneratorService)
export class AppViewModel {

  private logger: Logger;

  public router!: Router;

  constructor(
    private i18n: I18N,
    private appConfigService: AppConfigService,
    private cordovaServiceFn: () => CordovaService,
    private eventBusService: EventBusService,
    private languageService: LanguageService,
    private httpClient: HttpClient,
    private routeGeneratorService: RouteGeneratorService,
  ) {
    this.logger = LogManager.getLogger('AppViewModel');
    this.configureHttpClient();
    this.configureMoment();
  }

  public configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = this.i18n.tr('TITLE');
    if (this.appConfigService.platformIsBrowser()) {
      config.options.pushState = true;
    }
    if (this.appConfigService.platformIsMobile()) {
      this.cordovaServiceFn();
    }
    config.map(this.routeGeneratorService.getRootRoutesConfig());
    config.mapUnknownRoutes({ route: '', redirect: '' });

    config.addAuthorizeStep(ExampleStep);

    this.router = router;
  }

  private configureMoment(): void {
    const locale = this.languageService.getCurrentLocale();
    moment.locale(locale);
    this.eventBusService.addSubscription(EventBusEvents.IDS.i18n.locale.changed, (a) => moment.locale(a.newValue));
  }

  private configureHttpClient(): void {
    this.httpClient.configure(config => {
      config
        .useStandardConfiguration()
        .withInterceptor({
          request: (request: Request) => {
            this.logger.debug('Request interceptor hit: ', request.url);
            return request;
          }
        });
    });
  }
}
