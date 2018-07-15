import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import { PLATFORM } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { BindingSignaler } from 'aurelia-templating-resources';

import { AppViewModel } from '../../src/app/app.vm';
import { EventBusService } from '../../src/app/services/event-bus.service';
import { LanguageService } from '../../src/app/services/language.service';
import { RouteGeneratorService } from '../../src/app/services/route-generator.service';

// tslint:disable-next-line:no-var-requires
const enTranslation = require('./../../src/locales/en.json');
// tslint:disable-next-line:no-var-requires
const deTranslation = require('./../../src/locales/de.json');

class RouterStub {
  public routes;
  public options = {
    pushState: undefined
  };

  public configure(handler): void {
    handler(this);
  }

  public map(routes): void {
    this.routes = routes;
  }

  // tslint:disable-next-line
  public mapUnknownRoutes(route): void { route; }

  // tslint:disable-next-line
  public addAuthorizeStep(step): void { step; }
}

class AppConfigStub {
  public platformIsBrowser(): boolean { return true; }
  public platformIsMobile(): boolean { return false; }
}

describe('the App module', () => {
  let sut;
  let mockedRouter;
  let i18nMock;

  beforeEach(() => {
    mockedRouter = new RouterStub();

    const AnyMock: any = undefined;

    // Translation setup
    i18nMock = new I18N(new EventAggregator(), new BindingSignaler());
    i18nMock.setup({
      resources: {
        en: {
          translation: enTranslation
        },
        de: {
          translation: deTranslation
        }
      },
      lng: 'en',
      debug: false
    });

    const appConfigSub = new AppConfigStub();
    const routeGeneratorService = new RouteGeneratorService(undefined as any);
    const languageService = new LanguageService(i18nMock, undefined as any);
    const eventBusService = new EventBusService(new EventAggregator());

    sut = new AppViewModel(
      i18nMock, appConfigSub as any, AnyMock, eventBusService, languageService, new HttpClient(), routeGeneratorService
    );
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Translation Title');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContainEqual({
      route: ['', 'welcome'],
      name: 'welcome',
      moduleId: PLATFORM.moduleName('modules/welcome/welcome.vm'),
      nav: true,
      title: 'Welcome'
    });
  });

  it('should have a users route', () => {
    expect(sut.router.routes).toContainEqual({
      route: 'users',
      name: 'users',
      moduleId: PLATFORM.moduleName('modules/users/users.vm'),
      nav: true,
      title: 'Github Users'
    });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).toContainEqual({
      route: 'child-router',
      name: 'child-router',
      moduleId: PLATFORM.moduleName('modules/child-router/child-router.vm'),
      nav: true,
      title: 'Child Router'
    });
  });
});
