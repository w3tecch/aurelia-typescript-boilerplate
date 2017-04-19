import { promise as wdpromise } from 'selenium-webdriver';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'aurelia-protractor-plugin/protractor';

export class PageObject_Welcome {

  public getGreeting(): wdpromise.Promise<string> {
    return element(by.tagName('h2')).getText();
  }

  public setFirstname(value): wdpromise.Promise<void> {
    let firstName = element(by.valueBind('firstName'));
    return firstName.clear().then(() => firstName.sendKeys(value));
  }

  public setLastname(value): wdpromise.Promise<void> {
    let lastName = element(by.valueBind('lastName'));
    return lastName.clear().then(() => lastName.sendKeys(value));
  }

  public getFullname(): wdpromise.Promise<string> {
    return element(by.css('.help-block')).getText();
  }

  public pressSubmitButton(): wdpromise.Promise<void> {
    return element(by.css('button[type="submit"]')).click();
  }

  public openAlertDialog(): wdpromise.Promise<any> {
    return browser.wait(async () => {
      await this.pressSubmitButton();

      await browser.wait(ExpectedConditions.alertIsPresent(), 5000);

      return browser.switchTo().alert().then(
        // use alert.accept instead of alert.dismiss which results in a browser crash
        (alert) => { alert.accept(); return true; },
        () => false
      );
    });
  }
}
