import { bootstrap } from 'aurelia-bootstrapper';
import { StageComponent } from 'aurelia-testing';
import { PLATFORM } from 'aurelia-pal';

describe('WelcomeComponent', () => {
  let component;

  beforeEach(async () => {
    component = StageComponent
      .withResources([
        PLATFORM.moduleName('../../src/app/modules/welcome/welcome.vm'),
        PLATFORM.moduleName('../../src/app/resources/converters/date-format.converter')
      ])
      .inView('<welcome-view-model></welcome-view-model>');
      await component.create(bootstrap);
  });

 if (jest) {
  xit('should render correctly', () => {
    expect(document.body.outerHTML).toMatchSnapshot();
  });
 }

  xit('should render first name', () => {
    const nameElement = document.querySelector('#fn') as HTMLInputElement;
    expect(nameElement.value).toBe('John');
  });

  afterEach(() => {
    component.dispose();
  });
});
