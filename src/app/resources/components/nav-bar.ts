import { bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class NavBarCustomElement {
  @bindable public router: Router = undefined;

  public title: string = undefined;

  constructor(
    ea: EventAggregator
  ) {
    ea.subscribe('router:navigation:complete', () => {
      const activRoute = _.find(this.router.navigation, r => r.isActive === true);
      this.title = activRoute && activRoute.title || undefined;
    });
  }

  public closeNav(): void {
    $('.button-collapse').sideNav('hide');
  }
}
