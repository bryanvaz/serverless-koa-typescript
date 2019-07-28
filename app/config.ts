/**
 * Global Koa Configuration (Local and Remote)
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface IConfig {
  port: number;
  debugLogging: boolean;
}

const config: IConfig = {
  port: +process.env.PORT || 3000,
  debugLogging: process.env.NODE_ENV === 'development',
};

export { config };
