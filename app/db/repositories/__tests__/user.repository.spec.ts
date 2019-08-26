import 'reflect-metadata';

import { Container } from 'typedi';
import { getCustomRepository } from 'typeorm';

import { Database } from '../../database';
import { User } from '../../entities';
import { UserFactory } from '../../__tests__/factories';

import { UserRepository } from '../user.repository';

describe('unit test: user repository', () => {
  beforeAll(async () => {
    const db = Container.get(Database);
    await db.connect();
  });

  it('should create user', async () => {
    const user: User = UserFactory.createUser();
    const result = await getCustomRepository(UserRepository).save(user);
    expect(result).toHaveProperty('first_name', user.first_name);
    expect(result).toHaveProperty('last_name', user.last_name);
    expect(result).toHaveProperty('email', user.email);
  });

  it('should fail to create user with duplicate email', async () => {
    const user: User = UserFactory.createUser();
    console.log(`first user: ${JSON.stringify(user)}`);
    await getCustomRepository(UserRepository).insert(user);
    try {
      const dupUser: User = UserFactory.createUser();
      dupUser.email = user.email;
      await getCustomRepository(UserRepository).insert(dupUser);
    } catch (err) {
      expect(err.name).toBe('QueryFailedError');
    }
  });

  it('should get user by username', async () => {
    const user: User = UserFactory.createUser();
    console.log(`first user: ${JSON.stringify(user)}`);
    await getCustomRepository(UserRepository).insert(user);
    const result = await getCustomRepository(UserRepository).getUserByEmail(user.email);
    expect(result).toHaveProperty('first_name', user.first_name);
    expect(result).toHaveProperty('last_name', user.last_name);
    expect(result).toHaveProperty('email', user.email);
  });
});
