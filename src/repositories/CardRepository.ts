import { EntityRepository, Repository } from 'typeorm';
import { Card } from '../models';

@EntityRepository(Card)
export default class UserRepository extends Repository<Card> {
  public async findById(id: string): Promise<Card | false | string> {
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

  public async findByEmail(email: string): Promise<Card | false | string> {
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
