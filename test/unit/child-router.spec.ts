import {expect} from './setup';
import {ChildRouter} from '../../src/app/modules/child-router/child-router';

class RouterStub {
  public routes;

  public configure(handler): void {
    handler(this);
  }

  public map(routes): void {
    this.routes = routes;
  }
}

describe('the Child Router module', () => {
  let sut;
  let mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new ChildRouter();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).ok;
  });

  it('configures the heading', () => {
    expect(sut.heading).to.equal('Child Router');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).to.contain({
      route: ['', 'welcome'],
      name: 'welcome',
      moduleId: './../welcome/welcome',
      nav: true,
      title: 'Welcome'
    });
  });

  it('should have a users route', () => {
    expect(sut.router.routes).to.contain({
      route: 'users',
      name: 'users',
      moduleId: './../users/users',
      nav: true,
      title: 'Github Users'
    });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).to.contain({
      route: 'child-router',
      name: 'child-router',
      moduleId: './../child-router/child-router',
      nav: true,
      title: 'Child Router'
    });
  });
});
