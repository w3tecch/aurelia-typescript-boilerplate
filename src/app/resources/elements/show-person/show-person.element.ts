import { autoinject } from 'aurelia-framework';

@autoinject
export class ShowPersonCustomElement {

  public firstName = '';

  public activate(args): void {
    this.firstName = args.firstName;
  }

  public get isValid(): boolean {
    // We could check if a form is valid
    return true;
  }
}
