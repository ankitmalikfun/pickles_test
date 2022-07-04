export interface ISMTPConfigurations {
  host: string;
  port: number;
  waitTime: number;
  retries: number;
  auth: {
    username: string;
    password: string;
  };
  from: {
    name: string;
    address: string;
  };
}
