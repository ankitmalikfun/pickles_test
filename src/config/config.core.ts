import dotenv = require("dotenv");
import ICoreConfig from "./ICoreConfig";
import { EnvVars } from "../libs/constants";

if (process.env.NODE_ENV === EnvVars.TEST) {
  dotenv.config({ path: ".env.test" });
} else {
  dotenv.config();
}

const config: ICoreConfig = {
  apiPrefix: process.env.API_PREFIX,
  postgres: {
    database: process.env.PG_DB,
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5432,
    max: process.env.MAXINPOOL || 5,
    min: process.env.MININPOOL || 0,
    acquireTime: process.env.ACQUIRETIME || 30000,
    idleTime: process.env.IDLETIME || 10000,
    ...(process.env.PG_SSL === "true" && { ssl: true })
  },
  corsOrigin: process.env.CORS_ORIGIN,
  debug: process.env.DEBUG === "true",
  hostUrl: process.env.HOST_URL,
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  smtpConfigurations: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    waitTime: parseInt(process.env.SMTP_WAIT_TIME, 10) || 3000,
    retries: parseInt(process.env.SMTP_RETRY_COUNT, 10) || 5,
    from: {
      name: process.env.EMAIL_FROM_NAME || "Test Email Notification Service",
      address: process.env.EMAIL_AUTH_USER || "notification-service@gmail.com"
    },
    auth: {
      username: process.env.EMAIL_AUTH_USER,
      password: process.env.EMAIL_AUTH_PASS

    }
  }
};

// logger.debug(":::::: INITIAL CONFIGURATIONS ::::::");
// logger.debug(JSON.stringify(config, null, 2));

export default config;
