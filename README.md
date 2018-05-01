<p align="center">
  <img src="./w3tec-logo.png" alt="w3tec" width="400" />
</p>

<h1 align="center">Aurelia Typescript Boilerplate</h1>

<p align="center">
  <a href="https://david-dm.org/w3tecch/aurelia-typescript-boilerplate">
    <img src="https://david-dm.org/w3tecch/aurelia-typescript-boilerplate/status.svg?style=flat" alt="dependency" />
  </a>
  <a href="https://travis-ci.org/w3tecch/aurelia-typescript-boilerplate">
    <img src="https://travis-ci.org/w3tecch/aurelia-typescript-boilerplate.svg?branch=master" alt="travis" />
  </a>
  <a href="https://ci.appveyor.com/project/dweber019/aurelia-typescript-boilerplate/branch/master">
    <img src="https://ci.appveyor.com/api/projects/status/7oyx5vxl6ue6oqsf/branch/master?svg=true&passingText=Windows%20passing&pendingText=Windows%20pending&failingText=Windows%20failing" alt="appveyor" />
  </a>
</p>

<p align="center">
  <b>A full configured and ready to go boilerplate/skeleton for an Aurelia app</b></br>
  Heavily inspired by <a href="https://github.com/aurelia/skeleton-navigation/tree/master/skeleton-typescript-webpack">Aurelia Skeleton</a>.<br>
  <sub>Made with ❤️ by <a href="https://github.com/w3tecch">w3tech</a>, <a href="https://www.linkedin.com/in/david-weber-6a0819b7/">David Weber</a> and <a href="https://github.com/w3tecch/template-gen/graphs/contributors">contributors</a></sub>
</p>

<br />

## ❯ Why

The skeletons provided by Aurelia are great but aren't ready for an enterprise grade app. This boilerplate provides a lot of features out of the box like i18n or an optin Cordova setup.

## ❯ Table of Contents
- [Getting Started](#-getting-started)
- [Feature configuration](#-feature-configuration)
- [Bundling](#-bundling)
- [Running tests](#-running-tests)
- [App configuration](#-app-configuration)
- [HTML5 pushState routing](#-html5-pushstate-routing)
- [Cordova - Mobile development](#-cordova-mobile-development)
- [Docker](#-docker)
- [Additional features](#-additional-features)


## ❯ Getting started

Before you start, make sure you have a recent version of [NodeJS](http://nodejs.org/) environment *>=6.0* with NPM 3 or Yarn.

From the project folder, execute the following commands:

```shell
npm install # or: yarn install
```

This will install all required dependencies, including a local version of Webpack that is going to
build and bundle the app. There is no need to install Webpack globally.

To run the app execute the following command:

```shell
npm start # or: yarn start
```

This command starts the webpack development server that serves the build bundles.
You can now browse the skeleton app at http://localhost:8080 (or the next available port, notice the output of the command). Changes in the code
will automatically build and reload the app.

### Running with Hot Module Reload

If you wish to try out the experimental Hot Module Reload, you may run your application with the following command:

```shell
npm start -- webpack.server.hmr
```

## ❯ Feature configuration

Most of the configuration will happen in the `webpack.config.js` file.
There, you may configure advanced loader features or add direct SASS or LESS loading support.

## ❯ Bundling

To build an optimized, minified production bundle (output to /dist) execute:

```shell
npm start -- build
```

To build

To test either the development or production build execute:

```shell
npm start -- serve
```

The production bundle includes all files that are required for deployment.

## ❯ Running tests

This skeleton provides three frameworks for running tests.

You can choose one or two and remove the other, or even use all of them for different types of tests.

By default, both Jest and Karma are configured to run the same tests with Jest's matchers (see Jest documentation for more information).

If you wish to only run certain tests under one of the runners, wrap them in an `if`, like this:

```js
if (jest) {
  // since only jest supports creating snapshot:
  it('should render correctly', () => {
    expect(document.body.outerHTML).toMatchSnapshot();
  });
}
```

### Jest + Jasmine 2

Jest is a powerful unit testing runner and framework.
It runs really fast, however the tests are run under NodeJS, not the browser.
This means there might be some cases where something you'd expect works in reality, but fails in a test. One of those things will be SVG, which isn't supported under NodeJS. However, the framework is perfect for doing unit tests of pure functions, and works pretty well in combination with `aurelia-testing`.

To create new Jest tests, create files with the extension `.spec.ts`, either in the `src` directory or in the `test/unit` directory.

To run the Jest unit tests, run:

```shell
npm test
```

To run the Jest watcher (re-runs tests on changes), run:

```shell
npm start -- test.jest.watch
```

### Protractor (E2E / integration tests)

Integration tests can be performed with [Protractor](http://angular.github.io/protractor/#/).

1. Place your E2E-Tests into the folder ```test/e2e``` and name them with the extension `.e2e.ts`.

2. Run the tests by invoking

```shell
npm start -- e2e
```

### Running all test suites

To run all the unit test suites and the E2E tests, you may simply run:

```shell
npm start -- test.all
```

## ❯ App configuration
There is an app configuration management in place. Two standard environments are already set (development and production).
You can for example build the production with:

```shell
npm start -- webpack.build.production
```

If you like to add an additional configuration you have to do the following two steps:
1. Add the configuration json to ```app/config```, example preprod.json
2. Add the corresponding command to ```package-script.js``` and pass the right argument like ```--env.config=preprod```

Example for path ```webpack.build.preprod```:
```javascript
preprod: {
  inlineCss: series(
    'nps webpack.build.before',
    'webpack --progress -p --env.production --env.config=preprod'
  ),
  default: series(
    'nps webpack.build.before',
    'webpack --progress -p --env.production --env.extractCss --env.config=preprod'
  ),
  serve: series.nps(
    'webpack.build.production',
    'serve'
  ),
}
```

## ❯ HTML5 pushState routing
By default pushState, also known as html5 routing, is enabled. The Webpack server is already configured to handle this but many webserver need
extra configuration to enable this.

## ❯ Cordova - Mobile development

### Installation
Initiate cordova with the following commands:
```shell
npm install -g cordova
npm start -- mobile.setup
```

### Run and build
Cordova takes the ```www``` folder source to create the Cordova app. This ```www``` folder is a symlink pointing to the ```dist``` folder.
So make sure you run for example ```npm start -- build``` first before running/building a Cordova app.

Sometimes the ```www``` symlink is removed (e.g. git clone). Run this command to fix this:
```shell
npm start -- mobile.link
```

## ❯ Docker
There is a ```Dockerfile``` using the [nginx](https://hub.docker.com/_/nginx/) image to build the docker image.

### Getting started
First build your aurelia app with
```shell
npm start build
```

Then build the image with
```shell
docker build -t nginx-aurelia .
```

Then run a container with
```shell
docker run --name aurelia-app -d -p 8080:80 nginx-aurelia
```
Now your website is available with ```http://localhost:8080```.

If you like to update the source do this
```shell
docker cp ./dist/. mycontainer:/usr/share/nginx/html
```

## ❯ Additional features
This repository houses some additional features which prove to be very useful in projects.

### String polyfill
The file `utils/polyfills.utils.ts` contains a string polyfills.
With this polyfill you can do this:
```
String.isEmpty('Teststring') => false
String.isEmpty('') => true
String.isEmpty(undefined) => true
```

### Validation
The file `utils/validation.utils.ts` contains some validation helper functions and regex patterns.

The function `validateFilledFieldsWithValidationRules` us really useful as you can check a object which is already prefilled if it's valid and if not show errors.

The function `controllerValidByRules` will check if a validation controller is valid.

This could be an example implementation
```
class FormExample {

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public user: User;

  private controller: ValidationController;
  private rules: Rule<CustomerContactRestModel, any>[][];

  public constructor(
    private validationControllerFactory: ValidationControllerFactory
  ) {
    this.controller = this.validationControllerFactory.createForCurrentScope();
    this.controller.validateTrigger = validateTrigger.changeOrBlur;
  }

  public bind(): void {
    this.setupValidationRules();
    validateFilledFieldsWithValidationRules(this.rules, this.user, this.controller);
  }

  @computedFrom('user')
  public get isValid(): boolean {
    return controllerValidByRules(this.rules, this.user, this.controller);
  }

  private setupValidationRules(): void {
    this.rules = ValidationRules
      .ensure((user: User) => user.lastName)
        .displayName('USER.LAST_NAME')
        .required()
      .ensure((user: User) => user.email)
        .displayName('USER.EMAIL')
        .email()
      .on(this.user).rules;
  }
}
```

### i18n integration
You can pass a translation string into the `displayName('USER.LAST_NAME')` and it will be translated for you.

Additionally you can translate methods like `.required()` in `src/local/*` as demonstrated in the files.

If you use the the method `withMessageKey('YOUR.TRANSLATION')` you can pass a translation string and it will be translated for you.

### Route generator service
If you have router tree like this
```
     root
    /    \
left      right
```
You can't navigate from `left` to `right` with `this.router.navigateToRoute(...)` as `right` is in a branch which `left` is unaware of. This is due to the injection of the router service.

One solution is to use `this.router.navigate(...)` but this is unsafe as if the route configuration is changed the navigation is broken as it's hard coded.

The `route-generator.service.ts` will provide a type safe solution for save navigation.

Check the following files to get an idea how to use it:
- `route-generator.service.ts`
- `app.vm.ts` and `app.routes.ts`
- `child-router.vm.ts` and `child-router.routes.ts`

As an example you could navigate like this from `left` to `right`
```
this.routeGeneratorService.navigateByRouteNames(
  { routeName: 'root' },
  { routeName: 'right' }
);
```

You can also pass route parameters like this but remember that query parameter have to attached to the last element
```
this.routeGeneratorService.navigateByRouteNames(
  { routeName: 'root', params: { id: '1' }},
  { routeName: 'right' }
);
```

### Class transformer (model handling)
We have included the [class transformer](https://github.com/typestack/class-transformer) which helps creating models (`src/app/models/*`). This transformation can be done
in both direction (rest to model, model to rest).

### Dialog service
There is a custom dialog implementation for simpler usage of elements in dialogs.

The Service is named `generic-dialog.service.ts` and an example can be found in `welcome.vm.ts`.
