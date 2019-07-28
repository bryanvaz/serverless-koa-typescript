/**
 * Global Koa Environment Configuration (Local and Remote)
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface IEnvironment {
  port: number;
  debugLogging: boolean;
}

const env: IEnvironment = {
  port: +process.env.PORT || 3000,
  debugLogging: process.env.NODE_ENV === 'development',
};

export { env };
