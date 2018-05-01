import { autoinject } from 'aurelia-framework';
import { NavigationInstruction, Next } from 'aurelia-router';
import { Logger, LogManager } from './../services/logger.service';

@autoinject
export class ExampleStep {

  private logger: Logger;

  constructor() {
    this.logger = LogManager.getLogger('ExampleStep');
    this.logger.debug('initialized');
  }

  public run(navigationInstruction: NavigationInstruction, next: Next): any {
    this.logger.debug('Middleware hit on:', navigationInstruction.fragment);

    return next();
  }
}
