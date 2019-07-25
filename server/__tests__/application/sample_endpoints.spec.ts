/**
 * Application level Endpoint Tests
 * Author: Bryan Vaz
 * Date Created: 25 July 2019
 */
'use strict';

const request = require('supertest');
const assert = require('assert');
const ApiServer = require('../../..');

describe('app.request', () => {
  const app1 = new ApiServer();
  app1.request.message = 'hello';

  it('should merge properties', () => {
    app1.use((ctx, next) => {
      assert.equal(ctx.request.message, 'hello');
      ctx.status = 204;
    });

    return request(app1.listen())
      .get('/')
      .expect(204);
  });
});