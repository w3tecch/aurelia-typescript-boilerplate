import { PLATFORM } from 'aurelia-framework';

export function configure(aurelia): void {
  aurelia
    .globalResources([
      PLATFORM.moduleName('./date-format.converter'),
      PLATFORM.moduleName('./filter.converter'),
      PLATFORM.moduleName('./json.converter'),
      PLATFORM.moduleName('./limit.converter'),
      PLATFORM.moduleName('./md5.converter'),
      PLATFORM.moduleName('./sort.converter'),
    ]);
}
