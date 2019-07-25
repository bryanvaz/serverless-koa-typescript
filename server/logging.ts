/**
 * Base logger config for the Koa server
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import { Context } from 'koa';
import {
  createLogger, format, transports,
} from 'winston';
import { config } from './config';

export const logger = createLogger({
  level: config.debugLogging ? 'debug' : 'info',
  transports: [
    //
    // - Write all logs error (and below) to `error.log`.
    new transports.File({ filename: 'error.log', level: 'error' }),
    //
    // - Write to all logs with specified level to console.
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),
  ],
});

export async function loggerMiddleware(ctx: Context, next: Function): Promise<void> {
  const start = new Date().getMilliseconds();

  await next();

  const ms = new Date().getMilliseconds() - start;

  let logLevel: string;
  if (ctx.status >= 500) {
    logLevel = 'error';
  } else if (ctx.status >= 400) {
    logLevel = 'warn';
  } else if (ctx.status >= 100) {
    logLevel = 'info';
  }

  const msg = `[IP: ${ctx.request.ip}] ${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;

  logger.log(logLevel, msg);
}
