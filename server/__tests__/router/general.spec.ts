/**
 * Router mount tests for general endpoints
 * Author: Bryan Vaz
 * Date Created: 27 July 2019
 */
import * as Koa from 'koa';
import * as request from 'supertest';

import { router } from '../../routes';

describe('general routes', () => {
  const server = new Koa();
  server.use(router.routes()).use(router.allowedMethods());

  it("should mount helloWorld at '/'", async () => {
    const response = await request(server.listen())
      .get('/')
      .expect(200);
    expect(response.body.requestEndpoint).toBe('Hello World');
    expect(response.body.data).toBe('Hello World!');
  });

  it("should mount helloWorld at '/env-test'", async () => {
    process.env.ENV_TEST = 'ENV_TEST from Jest';
    const response = await request(server.listen())
      .get('/env-test')
      .expect(200);
    expect(response.body.requestEndpoint).toBe('Env Variable Test');
    expect(response.body.data).toBe(process.env.ENV_TEST);
  });
});
