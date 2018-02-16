import { autoinject } from 'aurelia-framework';
import { Compose } from 'aurelia-templating-resources';
import { DialogController } from 'aurelia-dialog';

import {
  IDialogConfiguration,
  DialogButton,
  IActionHandlers
} from '../../../services/generic-dialog.service';

interface IComposeWithViewModel<T> extends Compose {
  currentViewModel: T;
}

@autoinject
export class Dialog<T> {
  public buttons!: DialogButton<T>[];
  public contentModel: any;
  public contentView!: string;
  public title!: string;
  public composeElement!: IComposeWithViewModel<T>;
  private config!: IDialogConfiguration<T>;

  constructor(
    public controller: DialogController
  ) {
  }

  public attached(): void {
    this.setup();
  }

  public activate(dialogConfig: IDialogConfiguration<T>): void {
    this.config = dialogConfig;
    this.contentModel = this.config.contentModel;
    this.contentView = this.config.contentViewModel;
  }

  public execute(button: DialogButton<T>): void {
    this.activateButtons(false);
    button.execute().then(() => this.activateButtons(true));
  }

  private activateButtons(activate: boolean): void {
    this.buttons.forEach(button => button.enabled = activate);
  }

  private setup(): void {
    this.title = this.config.title;
    const actions: IActionHandlers<T> = {
      ok: this.controller.ok.bind(this.controller),
      cancel: this.controller.cancel.bind(this.controller),
      error: this.controller.error.bind(this.controller)
    };
    this.buttons = this.config.buttons.map(descriptor => {
      return new DialogButton(descriptor, this.composeElement.currentViewModel, actions);
    });
  }
}
