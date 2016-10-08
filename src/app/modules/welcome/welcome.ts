import { inject } from 'aurelia-framework';
import { LogManager } from 'aurelia-framework';
import { Logger } from 'aurelia-logging';

@inject('AppConfig')
export class Welcome {
	public heading: string = 'Welcome to the Aurelia Navigation App';
	public firstName: string = 'John';
	public lastName: string = 'Doe';
	public previousValue: string = this.fullName;
	private logger: Logger;

	constructor(private appConfig: AppConfig.IAppConfig) {
		this.logger = LogManager.getLogger('Welcome VM');
		this.logger.info('appConfig', appConfig);
	}

	//Getters can't be directly observed, so they must be dirty checked.
	//However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
	//To optimize by declaring the properties that this getter is computed from, uncomment the line below
	//as well as the corresponding import above.
	//@computedFrom('firstName', 'lastName')
	get fullName(): string {
		return `${this.firstName} ${this.lastName}`;
	}

	public submit(): void {
		this.previousValue = this.fullName;
		alert(`Welcome, ${this.fullName}!`);
	}

	public canDeactivate(): boolean {
		if (this.fullName !== this.previousValue) {
			return confirm('Are you sure you want to leave?');
		}
	}
}

export class UpperValueConverter {
	public toView(value: string): string {
		return value && value.toUpperCase();
	}
}
