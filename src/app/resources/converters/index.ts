export function configure(aurelia): void {
  aurelia
	  .globalResources([
      './date-format.converter',
      './filter.converter',
      './json.converter',
      './limit.converter',
      './md5.converter',
      './sort.converter',
    ]);
};
