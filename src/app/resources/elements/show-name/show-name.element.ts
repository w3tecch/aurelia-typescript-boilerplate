import './show-name.element.scss';
import { bindable } from 'aurelia-framework';

export class ShowNameCustomElement {
  @bindable public someText!: string;
}
