import { promise as wdpromise } from 'selenium-webdriver';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'aurelia-protractor-plugin/protractor';

export class PageObject_Skeleton {

  public getCurrentPageTitle(): wdpromise.Promise<string> {
    return browser.getTitle();
  }

  public navigateTo(href): wdpromise.Promise<any> {
    element(by.css('a[href="' + href + '"]')).click();
    return browser.waitForRouterComplete();
  }
}
