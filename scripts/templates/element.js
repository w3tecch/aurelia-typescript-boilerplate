const changeCase = require('change-case');

module.exports = {
  name: 'element',
  description: 'Creating a custom element',
  target: 'src/app/resources/elements/',
  wrapFolder: params => `${changeCase.paramCase(params.name).toLowerCase()}`,
  parameters: [
    {
      type: 'text',
      name: 'name',
      message: 'What\'s the element name (e.g. UserComment)?'
    }
  ],
  files: [
    {
      template: params => {
        return `import { autoinject, View } from 'aurelia-framework';

@autoinject
export class ${params.name}CustomElement {

  constructor() { }

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
      fileName: params => `${changeCase.paramCase(params.name).toLowerCase()}.element.ts`
    },
    {
      template: () => '<template></template>',
      fileName: params => `${changeCase.paramCase(params.name).toLowerCase()}.element.html`
    }
  ]
}
