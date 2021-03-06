/**
 * Base logger config for the Koa server
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import { Context } from 'koa';
import { createLogger, format, transports } from 'winston';
import { env } from '@config/environment';

/**
 * Global logger instance of winston.
 * This instance should be used in all areas of the app
 */
export const logger = createLogger({
  format: format.combine(format.colorize(), format.splat(), format.simple()),
  level: env.debugLogging ? 'debug' : 'info',
  transports: [
    //
    // - Write all logs error (and below) to `error.log`.
    // new transports.File({ filename: 'error.log', level: 'error' }),
    //
    // - Write to all logs with specified level to console.
    new transports.Console({}),
  ],
});

/**
 * Logger middleware for Koa requests.
 * Just logs simple details about the request to transports
 * @param ctx Koa Request Context
 * @param next Koa Next Callback
 */
export async function loggerMiddleware(ctx: Context, next: Function): Promise<void> {
  // Time the Koa execution cycle
  const start = new Date().getMilliseconds();
  await next();
  const ms = new Date().getMilliseconds() - start;

  // Set the log level based on the status code
  let logLevel: string;
  if (ctx.status >= 500) {
    logLevel = 'error';
  } else if (ctx.status >= 400) {
    logLevel = 'warn';
  } else if (ctx.status >= 100) {
    logLevel = 'info';
  }

  // Format the log line with simple request details and output to transports
  const msg = `[IP: ${ctx.request.ip}] ${ctx.method} ${ctx.originalUrl} ${ctx.status} ${ms}ms`;
  logger.log(logLevel, msg);
}
