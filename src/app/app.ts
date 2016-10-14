import { inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';

export interface Address {
  address: string;
  postcode: Address;
}

export interface Role {
  isAdmin: boolean;
}

export interface Person {
  name: string;
  address: Address;
  age: number;
  role: Role;
}

@inject(I18N, 'AppConfig')
export class App {
  public router: Router;

  public person: Person;

  constructor(
    private i18n: I18N,
    private appConfig: AppConfig.IAppConfig
  ) { }

  public configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = this.i18n.tr('TITLE');
    if (this.appConfig.PLATFORM === 'web') {
      config.options.pushState = true;
    }
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
