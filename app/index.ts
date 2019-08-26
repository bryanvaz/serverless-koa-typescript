/**
 * Application Server Entry Point
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import * as Koa from 'koa';
// import * as jwt from 'koa-jwt';
import * as bodyParser from 'koa-body';
import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
import 'reflect-metadata';
import { Container } from 'typedi';

import { /* logger , */ loggerMiddleware } from '@config/logging';
// import { config } from './config';
import { router } from '@app/routes';
import { Database } from '@app/db/database';

export class ApplicationServer extends Koa {
  public database: Database;

  public constructor() {
    // Create initial Koa Server
    super();

    // There is no need to connect on startup because the middleware code will connect on lambda request
    this.database = Container.get(Database);
    this.use(async () => {
      await this.database.connect();
    });

    // Enable bodyParser with default options
    this.use(bodyParser());

    // Provides important security headers to make your app more secure
    this.use(helmet());

    // Enable cors with default options
    this.use(cors());

    // Logger middleware -> use winston as logger (logging.ts with config)
    this.use(loggerMiddleware);

    // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
    // app.use(jwt({ secret: config.jwtSecret }));

    // this routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    this.use(router.routes()).use(router.allowedMethods());

    // }).catch(error => console.log('TypeORM connection error: ', error));
  }

  public async connectDB(): Promise<void> {
    this.database.connect();
  }
}
