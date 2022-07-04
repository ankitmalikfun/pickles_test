import IConfig from "./IConfig";

export const config: IConfig = {
  apiPrefix: "/api",
  postgres: {
    database: "",
    username: "",
    password: "",
    max: 5,
    min: 0,
    acquireTime: 30000,
    idleTime: 10000,
    host: "",
    port: 5432,
    ...("true" && { ssl: true })
  },
  corsOrigin: "",
  debug: true,
  hostUrl: "",
  nodeEnv: "test",
  port: "5004",
  smtpConfigurations: {
    host: "testing",
    port: 101,
    waitTime: 3000,
    retries: 5,
    from: {
      name: "test case",
      address: "test.case@testing.com"
    },
    auth: {
      username: "username",
      password: "username"
    }
  },
  swaggerUrl: "/api-docs",
  swaggerDefinition: {
    basePath: "/api",
    info: {
      description: "Notification API with Swagger",
      title: "Notification API",
      version: ""
    }
  }
};
