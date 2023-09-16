import { EntityRepository, Repository } from 'typeorm';
import { Deck } from '../models';

@EntityRepository(Deck)
export default class UserRepository extends Repository<Deck> {
  public async findById(id: string): Promise<Deck | false | string> {
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

  public async findByEmail(email: string): Promise<Deck | false | string> {
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
