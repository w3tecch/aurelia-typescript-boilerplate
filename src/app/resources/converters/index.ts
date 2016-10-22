export function configure(aurelia): void {
  aurelia
	  .globalResources([
      './date-format.converter'
    ]);
};
