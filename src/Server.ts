import * as logger from './libs/Logger';
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as methodOverride from "method-override";
import * as morganBody from "morgan-body";

import IConfig from "./config/IConfig";
import router from "./router";
import Swagger from "./libs/Swagger";
import { EnvVars } from "./libs/constants";
import { notFoundHandler, errorHandler } from "./middlewares";
const { default: coreConfig } = require("./config/config.core"); // tslint:disable-line
import corsNoResponse from "./entities/errors/CorsError";
export default class Server {
  private app: express.Express;

  constructor(private config: IConfig) {
    this.app = express();
  }

  get application() {
    return this.app;
  }

  /**
   * To enable all the setting on our express app
   * @returns -Instance of Current Object
   */
  public init() {
    this.initHelmet();
    this.initCompress();
    this.initCookieParser();
    // this.initCors();
    // this.initHeaders();
    // this.initAudit();

    this.initJsonParser();
    this.initMethodOverride();
    this.initLogger();
    this.initSwagger();
    this.initMigrations();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  public async reInit() {
    logger.info(":::RE-INITIALISING SWAGGER:::");

    this.initSwagger();
  }

  /**
   * Compression of the output
   */
  private initCompress() {
    this.app.use(compress());
  }

  public isValidOriginNew = currentOrigin => {
    const originArray = coreConfig.corsOrigin.split("|");
    return originArray.some(origin => {
      const trimmedOrigin = origin.trim();
      if (trimmedOrigin.includes("*.")) {
        return currentOrigin.endsWith(trimmedOrigin.replace("*", ""));
      }
      return currentOrigin === trimmedOrigin;
    });
  };

  /**
   * Parse Cookie header and populate req.cookies with an object keyed by the cookie names
   */
  private initCookieParser() {
    this.app.use(cookieParser());
  }

  /**
   *
   * Lets you to enable cors
   */
  private initCors() {
    if (this.config.corsOrigin) {
      const corsOptions = {
        methods: 'GET,POST,OPTIONS',
        origin: (origin, callback) => {
          if (this.isValidOriginNew(origin)) {
            callback(null, origin);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      };
      this.app.use(cors(corsOptions));
      this.app.use(corsNoResponse);
      // this.app.use(
      //   cors({
      //     optionsSuccessStatus: 200,
      //     // origin: JSON.parse(this.coreConfig.corsOrigin)
      //     origin: this.config.corsOrigin
      //     // credentials: true,
      //   })
      // );
    }
  }

  /**
   * Helmet helps you secure your Express apps by setting various HTTP headers.
   */
  private initHelmet() {
    this.app.use(helmet());
  }

  /**
   * Parses urlencoded bodies & JSON
   */
  private initJsonParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  /**
   * Enabling Logger for Development Environment
   */
  private initLogger() {
    const { nodeEnv } = this.config;

    if (nodeEnv !== EnvVars.TEST) {
      morganBody(this.app, {
        skip: (req, res) => {
          return req.originalUrl === "/api/health-check";
        }
      });
    }
  }

  /**
   * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
   */
  private initMethodOverride() {
    this.app.use(methodOverride());
  }

  /**
   * Initialize response headers
   */
  private initHeaders() {
    this.app.use((req, res, next) => {
      res.setHeader('Content-Security-Policy', 'font-src "self"');
      res.setHeader('Cache-control', 'no-store, no-cache');
      res.setHeader('x-request-id', req.headers['x-request-id'] || '');
      res.setHeader('x-b3-traceid', req.headers['x-b3-traceid'] || '');
      res.setHeader('x-b3-spanid', req.headers['x-b3-spanid'] || '');
      res.setHeader('x-b3-parentspanid', req.headers['x-b3-parentspanid'] || '');
      res.setHeader('x-b3-sampled', req.headers['x-b3-sampled'] || '');
      res.setHeader('x-b3-flags', req.headers['x-b3-flags'] || '');
      res.setHeader('x-ot-span-context', req.headers['x-ot-span-context'] || '');
      next();
    });
  }

  /**
   * Initialize audit manager
   */
  // public initAudit() {
  //   const auditMangaer: AuditManager = AuditManager.getInstance();
  //   auditMangaer.init(this.config.auditServer);
  // }

  /**
   * Initialize Swagger
   */
  private initSwagger() {
    const { swaggerDefinition, swaggerUrl } = this.config;

    const swaggerSetup = new Swagger();

    // JSON route
    this.app.use(
      `${swaggerUrl}.json`,
      swaggerSetup.getRouter({
        swaggerDefinition
      })
    );

    // UI route
    const { serve, setup } = swaggerSetup.getUI(swaggerUrl);

    this.app.use(swaggerUrl, serve, setup);
  }

  /**
   * This will Setup all the routes in the system
   * @returns -Instance of Current Object
   * @memberof Server
   */
  private setupRoutes() {
    const { apiPrefix } = this.config;

    // mount all routes on /api path
    this.app.use(apiPrefix, router);

    // catch 404 and forward to error handler
    this.app.use(notFoundHandler);
  }

  private setupErrorHandler() {
    const { nodeEnv } = this.config;

    // error handler, send stacktrace only during development
    this.app.use(errorHandler(nodeEnv));
  }

  public initMigrations() {
    logger.info("Running Migrations");
  }
}

