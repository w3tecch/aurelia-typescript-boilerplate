import { autoinject, PLATFORM } from 'aurelia-framework';
import { DialogService, DialogOpenPromise, DialogCancellableOpenResult } from 'aurelia-dialog';
import * as _ from 'lodash';

type ButtonAction<T> = (element: T) => Promise<any>;
type IsEnabled<T> = (element: T) => boolean;

export interface IDialogConfiguration<T> {
  title: string;
  buttons: IButtonDescriptor<T>[];
  contentViewModel: string;
  contentModel?: any;
}

export enum ButtonType {
  OK, CANCEL, OTHER, ERROR
}

export interface IButtonDescriptor<T> {
  title: string;
  type: ButtonType;
  onAction: ButtonAction<T>;
  classes: string;
  enabled: IsEnabled<T>;
}

interface IDialogButton {
  execute: () => void;
  isEnabled: boolean;
  classes: string;
  title: string;
}

export interface IActionHandlers<T> {
  ok: (output: any) => T;
  cancel: (output: any) => T;
  error: (output: any) => T;
}

export class DialogButton<T> implements IDialogButton {
  public enabled: boolean = true;

  public constructor(
    private descriptor: IButtonDescriptor<T>,
    private context: T,
    private actions: IActionHandlers<T>
  ) {
  }

  public get isEnabled(): boolean {
    return this.enabled && this.descriptor.enabled(this.context);
  }

  public get title(): string {
    return this.descriptor.title;
  }

  public get classes(): string {
    return this.descriptor.classes;
  }

  public async execute(): Promise<void> {
    try {
      const result = await this.descriptor.onAction(this.context);
      switch (this.descriptor.type) {
        case ButtonType.OK:
          this.actions.ok(result);
          break;
        case ButtonType.CANCEL:
          this.actions.cancel(result);
          break;
        case ButtonType.ERROR:
          this.actions.error(result);
          break;
        default:
          break;
      }
    } finally {
      return Promise.resolve();
    }
  }
}

@autoinject
export class GenericDialogService {

  public constructor(
    public dialogService: DialogService
  ) {
  }

  private static createButton<T>(
    title: string,
    onAction: ButtonAction<T>,
    type: ButtonType,
    enabled: IsEnabled<T> = () => true,
    classes = ''): IButtonDescriptor<T> {
    return { title, type, onAction, classes, enabled };
  }

  public static createSaveButton<T>(action: ButtonAction<T>, enabled?: IsEnabled<T>, classes = ''): IButtonDescriptor<T> {
    return GenericDialogService.createButton<T>(
      'ACTIONS.SAVE', action, ButtonType.OK, enabled, classes + ' btn-primary'
    );
  }
  public static createCancelButton<T>(action: ButtonAction<T>, enabled?: IsEnabled<T>, classes = ''): IButtonDescriptor<T> {
    return GenericDialogService.createButton<T>(
      'ACTIONS.CANCEL', action, ButtonType.CANCEL, enabled, classes + ' btn-outline-secondary'
    );
  }
  public static createCloseButton<T>(action: ButtonAction<T>, enabled?: IsEnabled<T>, classes = ''): IButtonDescriptor<T> {
    return GenericDialogService.createButton<T>(
      'ACTIONS.CLOSE', action, ButtonType.CANCEL, enabled, classes + ' btn-outline-secondary'
    );
  }
  public static createOtherButton<T>(title: string, action: ButtonAction<T>, enabled?: IsEnabled<T>, classes = ''): IButtonDescriptor<T> {
    return GenericDialogService.createButton<T>(title, action, ButtonType.OTHER, enabled, classes);
  }
  public static createErrorButton<T>(title: string, action: ButtonAction<T>, enabled?: IsEnabled<T>, classes = ''): IButtonDescriptor<T> {
    return GenericDialogService.createButton<T>(title, action, ButtonType.ERROR, enabled, classes);
  }

  public showDialog<T>(model: IDialogConfiguration<T>): DialogOpenPromise<DialogCancellableOpenResult> { // TODO: change type
    if (model.contentModel) {
      Object.keys(model.contentModel).forEach(key => {
        if (!_.isFunction(model.contentModel[key])) {
          model.contentModel[key] = _.cloneDeep(model.contentModel[key]);
        }
      });
    }
    return this.dialogService.open({ viewModel: PLATFORM.moduleName('resources/elements/dialog/dialog.element'), model });
  }
}
