import { browser, element, by, promise } from 'aurelia-protractor-plugin/protractor';

export class PageObjectSkeleton {
  public getCurrentPageTitle(): promise.Promise<string> {
    return browser.getTitle();
  }

  public async navigateTo(href: string): Promise<void> {
    const navigatingReady = browser.waitForRouterComplete();
    await element(by.css('a[href="' + href + '"]')).click();
    await navigatingReady;
  }
}
