import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async getUserByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }

  public async getAllUsers(): Promise<User[] | undefined> {
    return this.find();
  }
}
