/**
 * Endpoint Tests for Sample Controller
 * Author: Bryan Vaz
 * Date Created: 25 July 2019
 */
import * as Koa from 'koa';
import * as request from 'supertest';
// import * as koaBody from 'koa-body';

import UserController from '../UserController';

import { User } from '../../db/entities/User';

describe('controllers.UserController:', () => {
  describe('helloWorld', () => {
    // Initialize new server for function testing
    const server = new Koa();
    server.use(UserController.all);

    it('should be able to call function successfully', () =>
      request(server.listen())
        .get('/')
        .expect(200));

    it('should return data from db', async () => {
      User.create();
      const response = await request(server.listen())
        .get('/')
        .expect(200);
      expect(response.body.requestEndpoint).toBe('Hello World');
      expect(response.body.data).toBe('Hello World!');
    });
  });
});
