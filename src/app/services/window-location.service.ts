export class WindowLocationService {

  public static changeLocation(destination: string): void {
    window.location.assign(destination);
  }

  public static changeLocationAfterPageLoad(destination: string): void {
    // Wait for resources to load before redirect. Without this Safari would fail
    // to load/activate resources, like fonts.
    const waitForPageLoad = () => {
      if (document.readyState === 'complete') {
        WindowLocationService.changeLocation(destination);
      } else {
        setTimeout(waitForPageLoad, 500);
      }
    };
    waitForPageLoad();
  }

  public static getHashQueryString(): string {
    return window.location.hash.substring(1);
  }

  public static getLocationOrigin(): string {
    if (window.location.origin) {
      return window.location.origin;
    }
    // IE11 fix, when window.location.origin is undefined
    let locationOrigin = `${window.location.protocol}//${window.location.hostname}`;
    locationOrigin += window.location.port ? ':' + window.location.port : '';
    return locationOrigin;
  }
}
