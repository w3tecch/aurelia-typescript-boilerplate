import { bindable } from 'aurelia-framework';

export class NavBar {
  @bindable public router = undefined;

  public attached(): void {
    $('.button-collapse').sideNav();
  }

  public closeNav(): void {
    $('.button-collapse').sideNav('hide');
  }
}
