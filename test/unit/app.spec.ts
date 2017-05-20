import { PLATFORM } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { BindingSignaler } from 'aurelia-templating-resources';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';

import { AppViewModel } from '../../src/app/app.vm';
import { AppConfigService } from '../../src/app/services/app-config.service';
let en_USTranslation = require('./../../src/locales/en_US.json');
let de_CHTranslation = require('./../../src/locales/de_CH.json');

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
  let appConfigSub;
  let i18nMock;

  beforeEach(() => {
    mockedRouter = new RouterStub();

    const AnyMock: any = undefined;

    // Translation setup
    i18nMock = new I18N(new EventAggregator(), new BindingSignaler());
    i18nMock.setup({
      resources: {
        'en-US': {
          translation: en_USTranslation
        },
        'de-CH': {
          translation: de_CHTranslation
        }
      },
      lng: 'en-US',
      debug: false
    });

    appConfigSub = new AppConfigStub();

    sut = new AppViewModel(i18nMock, appConfigSub, AnyMock, AnyMock, AnyMock, new HttpClient());
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
      moduleId: PLATFORM.moduleName('./modules/welcome/welcome.vm'),
      nav: true,
      title: 'Welcome'
    });
  });

  it('should have a users route', () => {
    expect(sut.router.routes).toContainEqual({
      route: 'users',
      name: 'users',
      moduleId: './modules/users/users.vm',
      nav: true,
      title: 'Github Users'
    });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).toContainEqual({
      route: 'child-router',
      name: 'child-router',
      moduleId: './modules/child-router/child-router.vm',
      nav: true,
      title: 'Child Router'
    });
  });
});
