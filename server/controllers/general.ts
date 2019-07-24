import { BaseContext } from 'koa';

export default class GeneralController {

    public static async helloWorld (ctx: BaseContext) {
        ctx.body = {
          requestEndpoint: 'Hello World',
          data: 'Hello World!',
        };
    }

    public static async envTest (ctx: BaseContext) {
      ctx.body = {
        requestEndpoint: 'Env Variable Test',
        data: process.env.ENV_TEST || 'ENV_TEST Var not set',
      };
  }

}