const changeCase = require('change-case');

module.exports = {
  name: 'pipeline',
  description: 'Creating a pipeline',
  target: 'src/app/pipelines/',
  wrapFolder: undefined,
  parameters: [
    {
      type: 'text',
      name: 'name',
      message: 'What\'s the pipeline name (e.g. DateFormat)?'
    }
  ],
  files: [
    {
      template: params => {
        return `import { autoinject } from 'aurelia-framework';
import { NavigationInstruction, Next } from 'aurelia-router';
import { Logger, LogManager } from './../services/logger.service';

@autoinject
export class ${params.name}Step {

  private logger: Logger;

  constructor() {
    this.logger = LogManager.getLogger('${params.name}Step');
    this.logger.debug('initialized');
  }

  public run(navigationInstruction: NavigationInstruction, next: Next): any {
    this.logger.debug('Middleware hit on:', navigationInstruction.fragment);

    return next();
  }
}
`;
      },
      fileName: params => `${changeCase.paramCase(params.name).toLowerCase()}.step.ts`
    },
  ]
}
