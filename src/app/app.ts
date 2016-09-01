import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  private router: Router;

  public configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'Aurelia';
    config.options.pushState = true;
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: './modules/welcome/welcome',
        nav: true,
        title: 'Welcome'
      },
      {
        route: 'users',
        name: 'users',
        moduleId: './modules/users/users',
        nav: true,
        title: 'Github Users'
      },
      {
        route: 'child-router',
        name: 'child-router',
        moduleId: './modules/child-router/child-router',
        nav: true,
        title: 'Child Router'
      }
    ]);

    this.router = router;
  }
}
