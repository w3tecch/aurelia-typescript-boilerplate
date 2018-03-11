import { PLATFORM } from 'aurelia-framework';

export function configure(aurelia): void {
  aurelia
    .globalResources([
      PLATFORM.moduleName('./show-name/show-name.element')
    ]);
}
