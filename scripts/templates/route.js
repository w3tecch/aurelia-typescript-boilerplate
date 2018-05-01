const changeCase = require('change-case');

module.exports = {
  name: 'route',
  description: 'Creating a Route file',
  target: 'src/app/modules/',
  wrapFolder: undefined,
  parameters: [
    {
      type: 'text',
      name: 'name',
      message: 'What\'s the routes file name?'
    },
    {
      type: 'text',
      name: 'routeName',
      message: 'What\'s the route name (e.g. welcome)?'
    },
    {
      type: 'text',
      name: 'routePath',
      message: 'What\'s the path to the view model (without .ts, e.g. modules/welcome/welcome.vm)?'
    }
  ],
  files: [
    {
      template: params => {
        return `import { PLATFORM } from 'aurelia-framework';

export type RouteNames = '${params.routeName}';

export const welcome = {
  route: '${params.routeName}',
  name: '${params.routeName}',
  moduleId: PLATFORM.moduleName('${params.routePath}', '${params.routeName}'),
  title: '${changeCase.ucFirst(params.routeName)}'
};
`;
      },
      fileName: params => `${changeCase.paramCase(params.name)}.routes.ts`
    },
  ]
}
