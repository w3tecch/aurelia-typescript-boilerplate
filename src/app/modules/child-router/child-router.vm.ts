import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

import { RouteGeneratorService } from './../../services/route-generator.service';

@autoinject
export class ChildRouterViewModel {

	public router!: Router;
  public heading = 'Child Router';

  constructor(
    private routeGeneratorService: RouteGeneratorService,
  ) { }

	public configureRouter(config: RouterConfiguration, router: Router): void {
    config.map(this.routeGeneratorService.getRoutesConfigByParentRouteName('child-router'));

		this.router = router;
	}
}
