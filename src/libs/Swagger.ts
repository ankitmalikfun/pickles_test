import { Router } from 'express';
import swaggerJSDoc = require('swagger-jsdoc');
import * as swaggerUi from 'swagger-ui-express';
import { ProductionEnvironments } from "../libs/constants";
import config from "../config/config.core";

export interface ISwaggerDefinition {
  swaggerDefinition: {
    basePath: string;
    info: {
      description: string;
      title: string;
      version: string;
    };
  };
}

export const swaggerConfig = {
  swaggerDefinition: {
    basePath: "/api",
    info: {
      description: "Email Notification Service API",
      title: "Email Notification Service API",
      version: "1.0.0"
    }
    // securityDefinitions: {
    //   Bearer: {
    //     in: "header",
    //     name: "Authorization",
    //     type: "apiKey"
    //   }
    // }
  },
  swaggerUrl: "/api-docs"
};

export default class Swagger {

  public getRouter({ swaggerDefinition }: ISwaggerDefinition) {
    const router = Router();

    router.route('/')
      .get((req, res) => {
        // options for the swagger docs
        const options = {
          // path to the API docs
          apis: ['dist/**/*.js'],
          // import swaggerDefinitions
          swaggerDefinition
        };
        // initialize swagger-jsdoc
        const swaggerSpec = swaggerJSDoc(options);
        res.send(swaggerSpec);
      });
    return router;
  }

  public getUI(swaggerUrl: string) {
    const ifSwagger = !ProductionEnvironments.includes(config.nodeEnv);
    const options = {
      swaggerUrl: `${swaggerUrl}.json`,
      ...!ifSwagger && { customCss: '#operations-Tenants-delete_tenants { display: none }' }
    };

    return {
      serve: swaggerUi.serve,
      setup: swaggerUi.setup(undefined, options)
    };
  }
}
