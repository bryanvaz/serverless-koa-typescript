/**
 * Sample Controller for Boilerplate Example
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import { BaseContext } from 'koa';
// import { logger } from '@config/logging';

export default class GeneralController {
  public static async helloWorld(ctx: BaseContext): Promise<void> {
    ctx.body = {
      requestEndpoint: 'Hello World',
      data: 'Hello World!',
    };
  }

  public static async envTest(ctx: BaseContext): Promise<void> {
    ctx.body = {
      requestEndpoint: 'Env Variable Test',
      data: process.env.ENV_TEST || 'ENV_TEST Var not set',
    };
  }

  /**
   * Squares the input parameter in the body
   * @param ctx Koa Request Context
   */
  public static async square(ctx: BaseContext): Promise<void> {
    if (ctx.request.body && ctx.request.body.input) {
      if (typeof ctx.request.body.input === 'number') {
        ctx.body = {
          requestEndpoint: 'Square',
          input: ctx.request.body.input,
          output: ctx.request.body.input ** 2,
          type: typeof ctx.request.body.input,
        };
      } else {
        ctx.body = {
          requestEndpoint: 'Square',
          input: ctx.request.body.input,
          type: typeof ctx.request.body.input,
          error: ["input must be of type 'number'"],
        };
        ctx.status = 400;
      }
    } else {
      ctx.body = {
        requestEndpoint: 'Square',
        input: ctx.request.body.input,
        error: ['No input provided'],
      };
      ctx.status = 400;
    }
  }
}
