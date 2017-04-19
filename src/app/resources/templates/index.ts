import { PLATFORM } from 'aurelia-framework';

export function configure(aurelia): void {
  aurelia
	  .globalResources([
      PLATFORM.moduleName('./nav-bar/nav-bar.html')
    ]);
}
