import { inject, computedFrom } from 'aurelia-framework';
import { LogManager } from 'aurelia-framework';
import { MdToastService } from 'aurelia-materialize-bridge';
import { CssAnimator } from 'aurelia-animator-css';
import { Logger } from 'aurelia-logging';

@inject(MdToastService, CssAnimator, Element, 'AppConfig')
export class Welcome {
  private previousValue: string = this.fullName;
  private logger: Logger;

  public heading: string = 'Welcome to the Aurelia Navigation App';
  public firstName: string = 'John';
  public lastName: string = 'Doe';
  public selectedDate = undefined;
  public animators = [
    'Base-Animator',
    'CSS-Animator',
    'Velocity-Animator',
    'TinyAnimate-Animator',
    'GreenSock-Animator'
  ];

  constructor(
    private toast: MdToastService,
    private animator: CssAnimator,
    private element: Element,
    private appConfig: AppConfig.IAppConfig
  ) {
    this.logger = LogManager.getLogger('Welcome VM');
    this.logger.info('appConfig', appConfig);
    this.logger.info('lodash', _);
    this.logger.info('moment', moment());
  }

  //Getters can't be directly observed, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from.
  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public submit(): void {
    this.previousValue = this.fullName;
    this.toast.show(`Welcome, ${this.fullName}!`, 4000);
  }

  public attached(): void {
    this.toast.show('You agreed!', 4000);
    this.toast.show((<AppConfig.IAppConfig>this.appConfig).NAME, 4000);
  }

  public setDate(): void {
    let date = new Date();
    this.selectedDate = date;
  }

  public removeAnimator(animator): void {
    let index = this.animators.indexOf(animator);
    this.animators.splice(index, 1);
  }

  public animateMe(): void {
    this.animator.animate(<HTMLElement>this.element.querySelector('.btn-animate-me'), 'btn-animation');
  }

}

export class UpperValueConverter {
  public toView(value: string): string {
    return value && value.toUpperCase();
  }
}
