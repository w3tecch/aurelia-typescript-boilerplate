/**
 * Environment Config
 */
interface IAppConfigEnv {
  NAME: string;
  API_URL: string;
  LOG_LEVEL: string;
}

declare var NAME: string;
declare var VERSION: string;
declare var ENV: IAppConfigEnv;

export interface IAppConfig {
  NAME: string;
  VERSION: string;
  ENV: IAppConfigEnv;
}

const AppConfig: IAppConfig = {
  NAME: NAME,
  VERSION: VERSION,
  ENV: ENV
};

export default AppConfig;
