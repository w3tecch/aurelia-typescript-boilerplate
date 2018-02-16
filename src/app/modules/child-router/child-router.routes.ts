import { PLATFORM } from 'aurelia-framework';

export type RouteNames = 'welcome' | 'users' | 'child-router';

export const welcome = {
  route: ['', 'welcome'],
  name: 'welcome',
  moduleId: PLATFORM.moduleName('modules/welcome/welcome.vm', 'welcome'),
  nav: true,
  title: 'Welcome'
};

export const users = {
  route: 'users',
  name: 'users',
  moduleId: PLATFORM.moduleName('modules/users/users.vm', 'users'),
  nav: true,
  title: 'Github Users'
};

export const childRouter = {
  route: 'child-router',
  name: 'child-router',
  moduleId: PLATFORM.moduleName('modules/child-router/child-router.vm', 'child-router'),
  nav: true,
  title: 'Child Router'
};
