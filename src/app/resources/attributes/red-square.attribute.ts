import { inject } from 'aurelia-framework';

@inject(Element)
export class RedSquareCustomAttribute {
  constructor(
    private element: Element
  ) {
    (<HTMLElement>this.element).style.width = (<HTMLElement>this.element).style.height = '100px';
    (<HTMLElement>this.element).style.backgroundColor = 'red';
  }
}
