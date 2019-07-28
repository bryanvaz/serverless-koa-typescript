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
    const testString = `ENV_TEST from Jest ${Math.random()}`;
    process.env.ENV_TEST = testString;
    const response = await request(server.listen())
      .get('/env-test')
      .expect(200);
    expect(response.body.requestEndpoint).toBe('Env Variable Test');
    expect(response.body.data).toBe(testString);
  });
});
