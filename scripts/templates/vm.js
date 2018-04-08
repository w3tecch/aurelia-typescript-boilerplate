const changeCase = require('change-case');

module.exports = {
  name: 'vm',
  description: 'Creating a View Model',
  target: 'src/app/modules/',
  wrapFolder: (params) => `${changeCase.paramCase(params.vm).toLowerCase()}`,
  parameters: [
    {
      type: 'text',
      name: 'vm',
      message: 'Whats the view model name (e.g. BlogList)?'
    }
  ],
  files: [
    {
      template: params => {
        return `import { autoinject, View } from 'aurelia-framework';

@autoinject
export class ${params.vm}ViewModel {

  constructor(
  ) { }

  public async canActivate(params, routeConfig, navigationInstruction): Promise<void> {

  }

  public activate(params, routeConfig, navigationInstruction): void {

  }

  public created(owningView: View, myView: View): void {

  }

  public bind(bindingContext, overrideContext): void {

  }

  public attached(): void {

  }

  public canDeactivate(): void {

  }

  public deactivate(): void {

  }

  public detached(): void {

  }

  public unbind(): void {

  }
}
`;
      },
      fileName: params => `${changeCase.paramCase(params.vm).toLowerCase()}.vm.ts`
    },
    {
      template: () => '<template></template>',
      fileName: params => `${changeCase.paramCase(params.vm).toLowerCase()}.vm.html`
    }
  ]
}
