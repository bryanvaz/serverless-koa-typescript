/**
 * Endpoint Tests for Sample Controller
 * Author: Bryan Vaz
 * Date Created: 25 July 2019
 */
import * as Koa from 'koa';
import * as request from 'supertest';
// import * as assert from 'assert';

import { general } from '..';

describe('controllers.general:', () => {
  describe('helloWorld', () => {
    // Initialize new server for function testing
    const server = new Koa();
    server.use(general.helloWorld);

    it('should be able to call function successfully', () =>
      request(server.listen())
        .get('/')
        .expect(200));

    it('should return correct data', async () => {
      const response = await request(server.listen())
        .get('/')
        .expect(200);
      expect(response.body.requestEndpoint).toBe('Hello World');
      expect(response.body.data).toBe('Hello World!');
    });
  });

  describe('envTest', () => {
    // Initialize new server for function testing
    const server = new Koa();
    server.use(general.envTest);

    process.env.ENV_TEST = 'ENV_TEST from Jest';

    it('should be able to call function successfully', () =>
      request(server.listen())
        .get('/')
        .expect(200));

    it('should return correct data', async () => {
      const response = await request(server.listen())
        .get('/')
        .expect(200);
      expect(response.body.requestEndpoint).toBe('Env Variable Test');
      expect(response.body.data).toBe(process.env.ENV_TEST);
    });
  });
});
