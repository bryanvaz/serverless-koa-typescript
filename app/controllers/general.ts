/**
 * Sample Controller for Boilerplate Example
 * Author: Bryan Vaz
 * Date Created: 24 July 2019
 */
import { BaseContext } from 'koa';

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
}
