/**
 * Application level Endpoint Tests
 * Author: Bryan Vaz
 * Date Created: 25 July 2019
 */
/* eslint-disable */
import * as Koa from 'koa';

const request = require('supertest');
const assert = require('assert');
const { general } = require('../index');

describe('app.request', () => {
  it('should merge properties', async () => {
    const server = new Koa();
    server.use(general.helloWorld);

    await request(server.callback())
      .get('/')
      .expect(200);
    server.stop();
  });
});
