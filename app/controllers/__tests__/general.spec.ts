/**
 * Endpoint Tests for Sample Controller
 * Author: Bryan Vaz
 * Date Created: 25 July 2019
 */
import * as Koa from 'koa';
import * as request from 'supertest';
import * as koaBody from 'koa-body';

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

    it('should be able to call function successfully', () =>
      request(server.listen())
        .get('/')
        .expect(200));

    it('should return correct data when ENV_TEST is set', async () => {
      const testString = `ENV_TEST from Jest ${Math.random()}`;
      process.env.ENV_TEST = testString;
      const response = await request(server.listen())
        .get('/')
        .expect(200);
      expect(response.body.requestEndpoint).toBe('Env Variable Test');
      expect(response.body.data).toBe(testString);
    });

    it('should return correct data when ENV_TEST is not set', async () => {
      process.env.ENV_TEST = '';
      const response = await request(server.listen())
        .get('/')
        .expect(200);
      expect(response.body.requestEndpoint).toBe('Env Variable Test');
      expect(response.body.data).toBe('ENV_TEST Var not set');
    });
  });

  describe('square', () => {
    // Initialize new server for function testing
    const server = new Koa();
    server.use(koaBody());
    server.use(general.square);

    it('function calls unsuccessfully with no input', async () => {
      const response = await request(server.listen())
        .post('/')
        .expect(400);
      expect(response.body.error).toContain('No input provided');
    });

    it('function calls successfully with input', async () => {
      const input = Math.ceil(Math.random() * 100 + 1);
      const response = await request(server.listen())
        .post('/')
        .send({
          input,
        })
        .expect(200);
      expect(response.body.output).toBe(input ** 2);
    });

    it('function fails with non number input', async () => {
      const input = `string of ${Math.ceil(Math.random() * 100 + 1)}`;
      const response = await request(server.listen())
        .post('/')
        .send({
          input,
        })
        .expect(400);
      expect(response.body.error).toContain("input must be of type 'number'");
    });
  });
});
