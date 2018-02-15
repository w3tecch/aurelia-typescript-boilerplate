import { bootstrap } from 'aurelia-bootstrapper';
import { StageComponent } from 'aurelia-testing';
import { PLATFORM } from 'aurelia-framework';

describe('ShowNameComponent', () => {
  let component;

  beforeEach(async () => {
    component = StageComponent
      .withResources([
        PLATFORM.moduleName('../../src/app/resources/elements/show-name/show-name.element'),
      ])
      .inView('<show-name some-text.bind="firstName"></show-name>')
      .boundTo({ firstName: 'Bob' });
      await component.create(bootstrap);
  });

  it('should render correctly', () => {
    expect(document.body.outerHTML).toMatchSnapshot();
  });

  it('should render first name', () => {
    const nameElement = document.querySelector('#fn') as HTMLInputElement;
    expect(nameElement.innerHTML).toBe('Bob');
  });

  afterEach(() => {
    component.dispose();
  });
});
