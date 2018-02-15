import { platforms } from './../models/platforms';

/**
 * Gets and defines the environment configruation
 */
declare var NAME: string;
declare var VERSION: string;
declare var PLATFORM: string;
declare var CONFIG: IAppConfigEnv;

export interface IAppConfigEnv {
  NAME: string;
  API_MAIN_URL: string;
  API_UAM_URL: string;
  LOG_LEVEL: string;
}

export class AppConfigService {
  private name: string;
  private version: string;
  private env!: string;
  private platform: string;
  private config: IAppConfigEnv;

  constructor() {
    this.name = NAME;
    this.version = VERSION;
    this.platform = PLATFORM;
    this.config = CONFIG;
  }

  public getName(): string { return this.name; }
  public getVersion(): string { return this.version; }
  public getEnv(): string { return this.env; }
  public getPlatform(): string { return this.platform; }
  public getConfig(): IAppConfigEnv { return this.config; }
  public platformIsBrowser(): boolean { return this.platform === platforms.BROWSER; }
  public platformIsMobile(): boolean { return this.platform === platforms.MOBILE; }
}
