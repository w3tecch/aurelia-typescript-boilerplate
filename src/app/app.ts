import { inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';

@inject(I18N)
export class App {
  private router: Router;

  constructor(
    private i18n: I18N
  ) { }

  public configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = this.i18n.tr('SITE_TITLE');
    config.options.pushState = true;
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: './modules/welcome/welcome',
        nav: true,
        title: this.i18n.tr('WELCOME.TITLE')
      },
      {
        route: 'users',
        name: 'users',
        moduleId: './modules/users/users',
        nav: true,
        title: this.i18n.tr('GIT_USERS.TITLE')
      },
      {
        route: 'child-router',
        name: 'child-router',
        moduleId: './modules/child-router/child-router',
        nav: true,
        title: this.i18n.tr('CHILD_ROUTER.TITLE')
      }
    ]);

    this.router = router;
  }
}
