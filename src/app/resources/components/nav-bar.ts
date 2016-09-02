import { bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

export class NavBarCustomElement {
  @bindable public router: Router = undefined;

  public closeNav(): void {
    $('.button-collapse').sideNav('hide');
  }
}
