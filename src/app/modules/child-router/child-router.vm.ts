import { PLATFORM } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class ChildRouterViewModel {

	public router: Router;
	public heading = 'Child Router';

	public configureRouter(config: RouterConfiguration, router: Router): void {
		config.map([
			{ route: ['', 'welcome'], name: 'welcome', moduleId: PLATFORM.moduleName('./../welcome/welcome.vm'), nav: true, title: 'Welcome' },
			{ route: 'users', name: 'users', moduleId: PLATFORM.moduleName('./../users/users.vm'), nav: true, title: 'Github Users' },
			{ route: 'child-router', name: 'child-router',
        moduleId: PLATFORM.moduleName('./../child-router/child-router.vm'), nav: true, title: 'Child Router' }
		]);

		this.router = router;
	}
}
