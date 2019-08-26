import * as faker from 'faker';
import { User } from '../../entities/User';

/**
 * Factory to create fake users for testing
 */
export class UserFactory {
  /**
   * Creates a random fake user
   * @returns fake user
   */
  public static createUser(): User {
    return new User({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
    });
  }
}
