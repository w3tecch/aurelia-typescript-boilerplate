import { autoinject } from 'aurelia-framework';
import { RouteHandler, RouteRecognizer } from 'aurelia-route-recognizer';
import { RouteConfig, Router } from 'aurelia-router';
import { cloneDeep, includes } from 'lodash-es';

import * as appRoutes from '../app.routes';
import * as childRouterRoutes from '../modules/child-router/child-router.routes';

export interface IRouteConfigItem {
  routeName: TAllowedRouteNames;
  params?: { [key: string]: any };
}

export type TAllowedRouteNames = appRoutes.RouteNames | childRouterRoutes.RouteNames;

export type TRouteConfig = [IRouteConfigItem];
export type ITreeConfig = RouteConfig & { subroutes?: ITreeConfig[] };

@autoinject()
export class RouteGeneratorService {

  private routeTree: ITreeConfig[] = [
    appRoutes.welcome,
    appRoutes.users,
    {
      ...appRoutes.childRouter,
      subroutes: [
        childRouterRoutes.welcome,
        childRouterRoutes.users,
        childRouterRoutes.childRouter,
      ]
    }
  ];

  constructor(
    private router: Router,
  ) { }

  public getUrlByRouteNames(routes: TRouteConfig): string {
    return this.buildUrl(cloneDeep(routes), this.routeTree);
  }

  public navigateByUrl(url: string, options?: any): void {
    this.router.navigate(url, options);
  }

  public navigateByRouteNames(routes: TRouteConfig, options?: any): void {
    const url = this.buildUrl(cloneDeep(routes), this.routeTree);
    this.navigateByUrl(url, options);
  }

  public getRoutesConfigByParentRouteName(routeName: TAllowedRouteNames): RouteConfig[] {
    const parentRoute = this.findNameInRouteTree(routeName, this.routeTree);

    if (!parentRoute) {
      throw new Error(
        `You route name ${routeName} couldn't be found!`
      );
    }

    if (parentRoute && !parentRoute.subroutes) {
      throw new Error(
        `You route name ${routeName} has no subroutes!`
      );
    }

    return this.removeSubroutes(parentRoute.subroutes as RouteConfig[]);
  }

  public getRootRoutesConfig(): RouteConfig[] {
    return this.removeSubroutes(this.routeTree);
  }

  public getRouteConfigByRouteName(routeName: TAllowedRouteNames): RouteConfig | undefined {
    return this.findNameInRouteTree(routeName, this.routeTree);
  }

  private removeSubroutes(routes: RouteConfig[]): RouteConfig[] {
    return routes.map(route => {
      const newRoute = cloneDeep(route);
      delete newRoute.subroutes;

      return newRoute;
    });
  }

  private findNameInRouteTree(routeName: TAllowedRouteNames, treeConfig: ITreeConfig | ITreeConfig[]): ITreeConfig | undefined {
    let result;
    if (treeConfig instanceof Array) {
      for (const conf of treeConfig) {
        result = this.findNameInRouteTree(routeName, conf);
        if (result) {
          break;
        }
      }
    } else {
      if (treeConfig.name === routeName) {
        return treeConfig;
      }
      if (treeConfig.subroutes) {
        result = this.findNameInRouteTree(routeName, treeConfig.subroutes);
      }
    }

    return result;
  }

  private buildUrl(routes: TRouteConfig, treeConfig: ITreeConfig[]): string {

    if (routes.length as any === 0) {
      return '';
    }

    const currentRouteConfig = routes.shift() as IRouteConfigItem;
    const currentTreeConfig = treeConfig.find(config => config.name === currentRouteConfig.routeName);

    if (!currentTreeConfig) {
      throw new Error(`The route config with name ${currentRouteConfig.routeName} doesn't exist!`);
    }

    const url = this.getUrlByTreeConfig(currentTreeConfig, currentRouteConfig);

    if (includes(url, '?') && routes.length >= 1) {
      throw new Error(
        `You provided a parameter not used in ${currentRouteConfig.routeName}. Add query parameters to the last route configuration!`
      );
    }

    return url + this.buildUrl(routes, currentTreeConfig.subroutes as ITreeConfig[]);
  }

  private getUrlByTreeConfig(treeConfig: ITreeConfig, routeConfig: IRouteConfigItem): string {

    const routeRecognizer = new RouteRecognizer();
    if (Array.isArray(treeConfig.route)) {
      treeConfig.route.forEach(value => routeRecognizer.add([{
        path: value,
        handler: treeConfig as RouteHandler,
        caseSensitive: true
      }]));
    } else {
      routeRecognizer.add([{
        path: treeConfig.route,
        handler: treeConfig as RouteHandler,
        caseSensitive: true
      }]);
    }

    return routeRecognizer.generate(routeConfig.routeName, routeConfig.params as any);
  }
}
