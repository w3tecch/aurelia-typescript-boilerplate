const changeCase = require('change-case');

module.exports = {
  name: 'service',
  description: 'Creating a Service',
  target: 'src/app/services/',
  wrapFolder: undefined,
  parameters: [
    {
      type: 'text',
      name: 'name',
      message: 'What\'s the service name (e.g. SuperFinder)?'
    }
  ],
  files: [
    {
      template: params => {
        return `import { autoinject } from 'aurelia-framework';
import { LogManager, Logger} from './logger.service';

@autoinject
export class ${params.name}Service {

  private logger: Logger;

  constructor() {
    this.logger = LogManager.getLogger('${params.name}Service');
    this.logger.debug('Cordova service initialized');
  }
}
`;
      },
      fileName: params => `${changeCase.paramCase(params.name).toLowerCase()}.service.ts`
    },
  ]
}
