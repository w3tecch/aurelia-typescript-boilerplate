import { autoinject, PLATFORM } from 'aurelia-framework';
import { ValidationControllerFactory, ValidationController, validateTrigger, ValidationRules } from 'aurelia-validation';
import { DialogService } from 'aurelia-dialog';

import { LogManager, Logger} from './../../services/logger.service';
import { AppConfigService } from './../../services/app-config.service';
import { LanguageService } from './../../services/language.service';
import { EditPersonCustomElement } from './../../resources/elements/edit-person/edit-person.element';
import { GenericDialogService } from './../../services/generic-dialog.service';
import { ShowPersonCustomElement } from '../../resources/elements/show-person/show-person.element';

@autoinject
export class WelcomeViewModel {
  private logger: Logger;
  private vController: ValidationController;

	public heading: string = 'Welcome to the Aurelia Navigation App';
	public firstName: string = 'John';
	public lastName: string = 'Doe';
	public previousValue: string = this.fullName;
  public currentDate: Date = new Date();
  public jsonProperty: Object = { key1: 'value1', key2: 'value2' };
  public validationValid: boolean = false;

	constructor(
    private appConfigService: AppConfigService,
    private languageService: LanguageService,
    private dialogService: DialogService,
    validationControllerFactory: ValidationControllerFactory,
    private genericDialogService: GenericDialogService,
  ) {
		this.logger = LogManager.getLogger('Welcome VM');
		this.logger.info('appConfig => name:', this.appConfigService.getName());
		this.logger.info('appConfig => version:', this.appConfigService.getVersion());
		this.logger.info('appConfig => env:', this.appConfigService.getEnv());
		this.logger.info('appConfig => platform:', this.appConfigService.getPlatform());
		this.logger.info('appConfig => config:', this.appConfigService.getConfig());

    this.vController = validationControllerFactory.createForCurrentScope();
    this.vController.validateTrigger = validateTrigger.manual;
	}

  public canDeactivate(): boolean {
		if (this.fullName !== this.previousValue) {
			return confirm('Are you sure you want to leave?');
		}
    return true;
	}

  public validateFirstName(): void {
    this.vController
      .validate({
        object: this,
        rules: ValidationRules.ensure('firstName').required().rules
      })
      .then(r => this.validationValid = r.valid);
  }

  public openDialog(): void {
    const person = { firstName: 'Wade', middleName: 'Owen', lastName: 'Watts' };
    this.dialogService.open({ viewModel: EditPersonCustomElement, model: person}).whenClosed(response => {
      if (!response.wasCancelled) {
        this.logger.info('Dialog not cancled', response);
      } else {
        this.logger.info('Dialog cancled', response);
      }
    });
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

  public switchLanguage(): void {
    const lang = this.languageService.getCurrentLang();
    if (lang === this.languageService.getSupportedLanguages()[0]) {
      this.languageService.setLocale(this.languageService.getSupportedLanguages()[1]);
    } else {
      this.languageService.setLocale(this.languageService.getSupportedLanguages()[0]);
    }
  }

  public openGenericDialog(): void {
    const dialog = this.genericDialogService.showDialog<ShowPersonCustomElement>({
      title: 'Zeige Person', // Can be a translation string
      contentViewModel: PLATFORM.moduleName('resources/elements/show-person/show-person.element'),
      contentModel: {
        firstName: this.firstName
      },
      buttons: [
        GenericDialogService.createCancelButton<ShowPersonCustomElement>(() => Promise.resolve()),
        GenericDialogService.createSaveButton<ShowPersonCustomElement>(ele => {
          this.logger.debug('Clicked on save in dialog', ele);
          return Promise.resolve();
        }, ele => ele.isValid)
      ]
    });

    dialog.whenClosed(result => {
      if (!result.wasCancelled) {
        this.logger.debug('Dialog not canceld', result);
      } else {
        this.logger.debug('Dialog canceld', result);
      }
    });
  }
}

export class UpperValueConverter {
	public toView(value: string): string {
		return value && value.toUpperCase();
	}
}
