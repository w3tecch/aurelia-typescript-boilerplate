import '../lib/setup';

import { I18N } from 'aurelia-i18n';
import { BindingSignaler } from 'aurelia-templating-resources';
import { EventAggregator } from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';

import { AppViewModel } from '../../src/app/app.vm';
import { AppConfigService } from '../../src/app/services/app-config.service';
import EnglishTranslation from '../../src/locales/en_US.json';

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

  public mapUnknownRoutes(route): void { ; }

  public addAuthorizeStep(step): void { ; }
}

describe('the App module', () => {
	let sut;
	let mockedRouter;
  let appConfigSub;

	beforeEach(() => {
		mockedRouter = new RouterStub();

    const AnyMock: any = undefined;

		// Translation setup
    sut = new I18N(new EventAggregator(), new BindingSignaler());
    sut.setup({
      resources: {
        en: {
					translation: EnglishTranslation
				}
      },
      lng: 'en',
      fallbackLng: 'en',
      debug: false
    });

    appConfigSub = new AppConfigService();

    sut = new AppViewModel(sut, appConfigSub, AnyMock, AnyMock, AnyMock, new HttpClient());
		sut.configureRouter(mockedRouter, mockedRouter);
	});

	it('contains a router property', () => {
		expect(sut.router).toBeDefined();
	});

	it('configures the router title', () => {
		expect(sut.router.title).toEqual('Transaltion Title');
	});

	it('should have a welcome route', () => {
		expect(sut.router.routes).toContain({
			route: ['', 'welcome'],
			name: 'welcome',
			moduleId: './modules/welcome/welcome.vm',
			nav: true,
			title: 'Welcome'
		});
	});

	it('should have a users route', () => {
		expect(sut.router.routes).toContain({
			route: 'users',
			name: 'users',
			moduleId: './modules/users/users.vm',
			nav: true,
			title: 'Github Users'
		});
	});

	it('should have a child router route', () => {
		expect(sut.router.routes).toContain({
			route: 'child-router',
			name: 'child-router',
			moduleId: './modules/child-router/child-router.vm',
			nav: true,
			title: 'Child Router'
		});
	});
});
