import { PLATFORM } from 'aurelia-framework';

import { ChildRouterViewModel } from '../../src/app/modules/child-router/child-router.vm';
import { RouteGeneratorService } from '../../src/app/services/route-generator.service';

class RouterStub {
	public routes;

	public configure(handler): void {
		handler(this);
	}

	public map(routes): void {
		this.routes = routes;
	}
}

describe('the Child Router module', () => {
	let sut;
	let mockedRouter;

	beforeEach(() => {
    const routeGeneratorService = new RouteGeneratorService(undefined as any);

		mockedRouter = new RouterStub();
    sut = new ChildRouterViewModel(routeGeneratorService);
		sut.configureRouter(mockedRouter, mockedRouter);
	});

	it('contains a router property', () => {
		expect(sut.router).toBeDefined();
	});

	it('configures the heading', () => {
		expect(sut.heading).toEqual('Child Router');
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
