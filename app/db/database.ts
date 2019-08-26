import 'reflect-metadata';
import { Container, Service } from 'typedi';
import {
  Connection,
  createConnection,
  useContainer as ormUseContainer,
  ConnectionManager,
  getConnectionManager,
  // ConnectionOptions,
} from 'typeorm';
// import { Context } from 'koa';
// import * as PostgressConnectionStringParser from 'pg-connection-string';

// import { ConnectionSecure } from "../decorators/ConnectionSecure";
// import { IDatabase } from "../libs/IDatabase";

@Service()
// @ConnectionSecure(["connect"])
export class Database {
  // private connection: Connection;
  private connectionManager: ConnectionManager;

  private CONNECTION_NAME = 'default';

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async connect(): Promise<Connection> {
    let connection: Connection;

    if (this.connectionManager.has(this.CONNECTION_NAME)) {
      console.info('Database.getConnection()-using existing connection ...');
      connection = await this.connectionManager.get(this.CONNECTION_NAME);

      if (!connection.isConnected) {
        connection = await connection.connect();
        ormUseContainer(Container);
      }
    } else {
      console.info('Database.getConnection()-creating connection ...');

      // const connectionOptions: ConnectionOptions = {
      //     name: `default`,
      //     type: `postgres`,
      //     port: 5432,
      //     synchronize: true,
      //     logging: true,
      //     host: process.env.DB_HOST,
      //     username: process.env.DB_USERNAME,
      //     database: process.env.DB_NAME,
      //     password: process.env.DB_PASSWORD,
      //     namingStrategy: new SnakeNamingStrategy(),
      //     entities: [
      //         __dirname + "/entities/*.*"
      //     ]
      // }

      // Don't need a pwd locally
      // if (process.env.DB_PASSWORD) {
      //     Object.assign(connectionOptions, {
      //         password: process.env.DB_PASSWORD
      //     })
      // }

      connection = await createConnection(/* connectionOptions */);
    }
    return connection;

    // this.connection = await createConnection();
  }

  public async disconnect(): Promise<void> {
    let connection: Connection;
    // Only need to disconnect if has an existing connection
    if (this.connectionManager.has(this.CONNECTION_NAME)) {
      console.info('Database.getConnection()-using existing connection ...');
      connection = await this.connectionManager.get(this.CONNECTION_NAME);

      if (connection.isConnected) {
        await connection.close();
      }
    }
  }

  public async executeSQL(sql: string, ...params: any[]): Promise<any> {
    const connection = await this.connect();
    return connection.createQueryRunner().query(sql, params);
  }

  public async runMigrations() {
    const connection = await this.connect();
    await connection.runMigrations();
  }

  /**
   * Full Truncates DB!
   * Dangerous - Only meant for testing
   */
  public async reset() {
    const connection = await this.connect();
    await connection.dropDatabase();
    await connection.runMigrations();
  }

  /**
   * Drops Entire DB Schema!!!
   * Dangerous - Only meant for testing!!!
   */
  private async truncateDatabase() {
    const connection = await this.connect();
    await connection.dropDatabase();
  }

  // /**
  //  * Connection middleware for requests.
  //  * Ensures that the DB is connected
  //  * @param ctx Koa Request Context
  //  * @param next Koa Next Callback
  //  */
  // public async middleware(ctx: Context, next: Function): Promise<void> {
  //   await this.connect();
  //   // next();
  // }
}
