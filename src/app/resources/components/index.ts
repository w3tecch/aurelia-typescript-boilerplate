/**
 * List your common components here, to make them available globally in your application
 */
export function configure(aurelia): void {
  aurelia
    .globalResources(
    './nav-bar',
    './footer-bar.html'
    );
};
