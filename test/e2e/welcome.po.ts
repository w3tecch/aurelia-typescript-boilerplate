import { browser, element, by, ExpectedConditions, promise } from 'aurelia-protractor-plugin/protractor';
import { ElementFinder } from 'protractor/built/element';

export class PageObjectWelcome {
  public getGreeting(): promise.Promise<string> {
    return element(by.tagName('h2')).getText();
  }

  public getFirstnameElement(): ElementFinder {
    return element(by.valueBind('firstName'));
  }

  public setFirstname(value: string): promise.Promise<void> {
    const firstName = this.getFirstnameElement();
    return firstName.clear().then(() => firstName.sendKeys(value));
  }

  public getLastnameElement(): ElementFinder  {
    return element(by.valueBind('lastName'));
  }

  public setLastname(value: string): promise.Promise<void> {
    const lastName = this.getLastnameElement();
    return lastName.clear().then(() => lastName.sendKeys(value));
  }

  public getFullnameElement(): ElementFinder  {
    return element(by.css('.help-block'));
  }

  public getFullname(): promise.Promise<string> {
    return this.getFullnameElement().getText();
  }

  public pressSubmitButton(): promise.Promise<void> {
    return element(by.css('button[type="submit"]')).click();
  }

  public async openAlertDialog(): Promise<boolean> {
    await this.pressSubmitButton();

    await browser.wait(ExpectedConditions.alertIsPresent(), 5000);

    try {
      await browser.switchTo().alert().accept();
      return true;
    } catch (e) {
      return false;
    }
  }
}
