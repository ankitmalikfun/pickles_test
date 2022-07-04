const { default: coreConfig } = require("./config/config.core"); // tslint:disable-line

import * as logger from './libs/Logger';

import Database from "./services/Database";
import seed from "./seed";
import Server from './Server';
import { swaggerConfig } from './libs/Swagger';

const configurations = { ...coreConfig, ...swaggerConfig };
// logger.info("CONFIGURATIONS::::::::::", JSON.stringify(configurations, null, 2));

let runningServer = null;

const server = new Server(configurations);
server.init();

runningServer = server.application.listen(configurations.port);

runningServer.on("listening", async () => {

  const ann = `|| App is running at port '${configurations.port}' in '${configurations.nodeEnv}' mode ||`;

  logger.info(ann.replace(/[^]/g, "-"));
  logger.info(ann);
  logger.info(ann.replace(/[^]/g, "-"));
  logger.info("Press CTRL-C to stop\n");
});

runningServer.on("error", err => {
  logger.info(":::::: GOT ERROR IN STARTING SERVER ::::::");
  logger.error(err);
});

runningServer.on("close", () => {
  logger.info(`:::::: CLOSING SERVER RUNNING ON '${configurations.port}' IN '${configurations.nodeEnv}' MODE ::::::`);
});

/*
Database.open()
  .then(() => seed.start())
  .then(() => {
    let runningServer = null;

    const server = new Server(configurations);
    server.init();

    runningServer = server.application.listen(configurations.port);

    runningServer.on("listening", async () => {

      const ann = `|| App is running at port '${configurations.port}' in '${configurations.nodeEnv}' mode ||`;

      logger.info(ann.replace(/[^]/g, "-"));
      logger.info(ann);
      logger.info(ann.replace(/[^]/g, "-"));
      logger.info("Press CTRL-C to stop\n");
    });

    runningServer.on("error", err => {
      logger.info(":::::: GOT ERROR IN STARTING SERVER ::::::");
      logger.error(err);
    });

    runningServer.on("close", () => {
      logger.info(`:::::: CLOSING SERVER RUNNING ON '${configurations.port}' IN '${configurations.nodeEnv}' MODE ::::::`);
    });
  })
  .catch(err => {
    logger.info(":::::: GOT ERROR IN CREATING CONNECTION WITH DB ::::::");
    logger.error(err);
  });
*/
