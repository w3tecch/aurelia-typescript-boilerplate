/**
 * Environment Config
 */
export interface IAppConfigEnv {
  API_URL: string;
}

export interface IAppConfig {
  NAME: string;
  VERSION: string;
  CONFIG: IAppConfigEnv;
}

declare var NAME: string;
declare var VERSION: string;
declare var CONFIG: IAppConfigEnv;

const AppConfig: IAppConfig = {
  NAME: NAME,
  VERSION: VERSION,
  CONFIG: CONFIG
};

export default AppConfig;
