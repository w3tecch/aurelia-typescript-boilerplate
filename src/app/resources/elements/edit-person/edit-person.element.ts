import { autoinject } from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@autoinject
export class EditPersonCustomElement {

  public person = { firstName: '' };

  constructor(
    public dialogController: DialogController
  ) { }

  public activate(person): void {
    this.person = person;
  }
}
