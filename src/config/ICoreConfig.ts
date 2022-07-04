import { ISMTPConfigurations } from './ISMTPConfigurations';
export default interface ICoreConfig {
  apiPrefix: string;
  corsOrigin: string;
  // cosmosDbConnectionString: string;
  debug: boolean;
  hostUrl: string;
  nodeEnv: string;
  port: string;
  postgres: IPostgress;
  smtpConfigurations: ISMTPConfigurations;
  // masterTmsBaseURL: string;
}

export interface IPostgress {
  database: string;
  username: string;
  password: string;
  host: string;
  max: number | string;
  min: number | string;
  acquireTime: number | string;
  idleTime: number | string;
  port: number | string;
  ssl: boolean;
}
