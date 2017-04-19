import { LogManager, Logger} from './logger.service';

export class CordovaService {

  private logger: Logger;
  private cordovaReady: boolean = false;

  constructor() {
    this.logger = LogManager.getLogger('CordovaService');
    this.logger.debug('Cordova service initialized');
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  }

  public isCordovaReady(): boolean {
    return this.cordovaReady;
  }

  private onDeviceReady(): void {
    this.cordovaReady = true;

    document.addEventListener('pause', this.onPause.bind(this), false);
    document.addEventListener('resume', this.onResume.bind(this), false);

    this.logger.debug('Cordova platform:', window.cordova.platformId);
  }

  private onPause(): void {
    this.logger.debug('Cordova onPause');
  }

  private onResume(): void {
    this.logger.debug('Cordova onResume');
  }
}
