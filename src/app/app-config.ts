/**
 * Gets and defines the environment configruation
 */
declare var NAME: string;
declare var VERSION: string;
declare var ENV: string;
declare var PLATFORM: string;
declare var CONFIG: AppConfig.IAppConfigEnv;

const AppConfig: AppConfig.IAppConfig = {
  NAME: NAME,
  VERSION: VERSION,
  ENV: ENV,
  PLATFORM: PLATFORM,
  CONFIG: CONFIG
};

export default AppConfig;
