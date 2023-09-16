import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findById(id: string): Promise<User | false | string> {
    try {
      const user = await this.findOne(id);

      if (!user) {
        return false;
      }

      return user;
    } catch (error) {
      return error.severity || error;
    }
  }

  public async findByEmail(email: string): Promise<User | false | string> {
    try {
      const user = await this.findOne({ where: { email } });

      if (!user) {
        return false;
      }

      return user;
    } catch (error) {
      return error.severity || error;
    }
  }
}
