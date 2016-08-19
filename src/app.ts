import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: './views/welcome', nav: false, title: 'Welcome' },
      { route: ['intro'], name: 'intro', moduleId: './views/intro', nav: false, title: 'Intro' },
      { route: ['dashboard'], name: 'dashboard', moduleId: './vies/dashboard', nav: false, title: 'Dashboard' }

      // { route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
