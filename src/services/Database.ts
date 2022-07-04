const { default: coreConfig } = require("../config/config.core"); // tslint:disable-line

import * as logger from '../libs/Logger';

import { Sequelize } from "sequelize";

const sequelizeOptions = {
  ...coreConfig.postgres,
  dialect: "postgres",
  dialectOptions: {
    ssl: coreConfig.postgres.ssl
  },
  define: {
    paranoid: true
  },
  logging: false,
  pool: {
    max: parseInt(coreConfig.postgres.max, 10),
    min: parseInt(coreConfig.postgres.min, 10),
    acquire: parseInt(coreConfig.postgres.acquireTime, 10),
    idle: parseInt(coreConfig.postgres.idleTime, 10)
  }
};
export const db: Sequelize = new Sequelize(sequelizeOptions);

class Database {
  public models: any = {};

  constructor() {
    this.init();
  }

  public init() {
    this.models = {
      // TenantModel: TenantModel.initialize(db),

    };
  }

  public open() {
    return new Promise<void>((resolve, reject) => {
      db.authenticate()
        .then(async () => {
          await db.sync({ force: false });
          logger.debug("Connection has been established successfully.");
          resolve();
        })
        .catch(err => {
          logger.error("Unable to connect to the database:", err);
          reject(err);
        });
    });
  }
}

export default new Database();
