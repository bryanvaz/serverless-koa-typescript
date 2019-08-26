/**
 * General tests for Application Server
 * Author: Bryan Vaz
 * Date Created: 28 July 2019
 */
import * as request from 'supertest';

import { ApplicationServer } from '../..';
import { User } from '../../db/entities/User';
import { UserFactory } from '../../db/__tests__/factories';

describe('user app functions', () => {
  const server = new ApplicationServer();

  it("create a user at 'POST /user'", async () => {
    const user: User = UserFactory.createUser();
    /* const response = */ await request(server.listen())
      .post('/user')
      .send(user)
      .expect(200);
  });

  it('should get user just created', async () => {
    const user: User = UserFactory.createUser();
    await request(server.listen())
      .post('/user')
      .send(user)
      .expect(200);
    const response = await request(server.listen())
      .get('/users')
      .expect(200);
    expect(response).toContain(user);
  });
});
