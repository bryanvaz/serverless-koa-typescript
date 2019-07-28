/**
 * Application Server Entry Point
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import * as Koa from 'koa';
// import * as jwt from 'koa-jwt';
import * as koaBody from 'koa-body';
// import * as helmet from 'koa-helmet';
import * as cors from '@koa/cors';
// import { createConnection } from 'typeorm';
// import 'reflect-metadata';
// import * as PostgressConnectionStringParser from 'pg-connection-string';

import { /* logger , */ loggerMiddleware } from '@config/logging';
// import { config } from './config';
import { router } from '@app/routes';

export class ApplicationServer extends Koa {
  public constructor() {
    // create connection with database
    // note that its not active database connection
    // TypeORM creates you connection pull to uses connections from pull on your requests
    // createConnection({
    //     type: 'postgres',
    //     host: connectionOptions.host,
    //     port: connectionOptions.port,
    //     username: connectionOptions.user,
    //     password: connectionOptions.password,
    //     database: connectionOptions.database,
    //     synchronize: true,
    //     logging: false,
    //     entities: [
    //        'dist/entity/**/*.js'
    //     ],
    //     extra: {
    //         ssl: config.dbsslconn, // if not development, will use SSL
    //     }
    //  }).then(async connection => {

    // const app = new Koa();
    super();

    // Provides important security headers to make your app more secure
    // app.use(helmet());

    // Enable cors with default options
    this.use(cors());

    // Logger middleware -> use winston as logger (logging.ts with config)
    this.use(loggerMiddleware);

    // Enable bodyParser with default options
    this.use(koaBody());

    // JWT middleware -> below this line routes are only reached if JWT token is valid, secret as env variable
    // app.use(jwt({ secret: config.jwtSecret }));

    // this routes are protected by the JWT middleware, also include middleware to respond with "Method Not Allowed - 405".
    this.use(router.routes()).use(router.allowedMethods());

    // }).catch(error => console.log('TypeORM connection error: ', error));
  }
}
