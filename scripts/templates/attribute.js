const changeCase = require('change-case');

module.exports = {
  name: 'attribute',
  description: 'Creating a Attribute',
  target: 'src/app/resources/attributes/',
  wrapFolder: params => `${changeCase.paramCase(params.name).toLowerCase()}`,
  parameters: [
    {
      type: 'text',
      name: 'name',
      message: 'What\'s the attribute name (e.g. RedSquare)?'
    }
  ],
  files: [
    {
      template: params => {
        return `import { autoinject, View } from 'aurelia-framework';

@autoinject
export class ${params.name}CustomAttribute {
  constructor(
    private element: Element
  ) { }

  public created(owningView: View, myView: View): void {

  }

  public bind(bindingContext, overrideContext): void {

  }

  public attached(): void {

  }

  public detached(): void {

  }

  public unbind(): void {

  }
}
`;
      },
      fileName: params => `${changeCase.paramCase(params.name).toLowerCase()}.attribute.ts`
    },
  ]
}
