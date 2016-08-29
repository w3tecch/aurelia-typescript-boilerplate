import { inject, computedFrom } from 'aurelia-framework';
import { MdToastService } from 'aurelia-materialize-bridge';
import AppConfig, { IAppConfig } from './../../app.config';

@inject(MdToastService)
export class Welcome {
  public heading: string = 'Welcome to the Aurelia Navigation App';
  public firstName: string = 'John';
  public lastName: string = 'Doe';
  public selectedDate = undefined;

  private previousValue: string = this.fullName;

  constructor(
    private toast: MdToastService
  ) {
    this.toast.show('You agreed!', 4000);
    this.toast.show((<IAppConfig>AppConfig).NAME, 4000);
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

  public canDeactivate(): boolean {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }

  public setDate(): void {
    let date = new Date();
    this.selectedDate = date;
  }

}

export class UpperValueConverter {
  public toView(value: string): string {
    return value && value.toUpperCase();
  }
}
