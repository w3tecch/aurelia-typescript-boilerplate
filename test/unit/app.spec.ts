import './setup';
import {App} from '../../src/app/app';
import { I18N } from 'aurelia-i18n';
import {BindingSignaler} from 'aurelia-templating-resources';
import {EventAggregator} from 'aurelia-event-aggregator';
import EnglishTranslation from './../../src/assets/i18n/en';

class RouterStub {
  public routes;
  public options = {
    pushState: true
  };

  public configure(handler) {
    handler(this);
  }

  public map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  let sut;
  let mockedRouter;

  beforeEach(() => {
    // Router mock
    mockedRouter = new RouterStub();

    // Translation setup
    sut = new I18N(new EventAggregator(), new BindingSignaler());
    sut.setup({
      resources: {
        en: EnglishTranslation
      },
      lng: 'en',
      fallbackLng: 'en',
      debug: false
    });

    // App setup
    sut = new App(sut);

    // configure router
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual(EnglishTranslation.translation.SITE_TITLE);
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({ route: ['', 'welcome'], name: 'welcome',  moduleId: './modules/welcome/welcome', nav: true, title: EnglishTranslation.translation.WELCOME.TITLE });
  });

  it('should have a users route', () => {
    expect(sut.router.routes).toContain({ route: 'users', name: 'users', moduleId: './modules/users/users', nav: true, title: EnglishTranslation.translation.GIT_USERS.TITLE });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).toContain({ route: 'child-router', name: 'child-router', moduleId: './modules/child-router/child-router', nav: true, title: EnglishTranslation.translation.CHILD_ROUTER.TITLE });
  });
});
