import { inject } from 'aurelia-framework';

@inject(Element)
export class RedSquareCustomAttribute {
  constructor(
    private element: Element
  ) {
    (this.element as HTMLElement).style.width = (this.element as HTMLElement).style.height = '100px';
    (this.element as HTMLElement).style.backgroundColor = 'red';
  }
}
