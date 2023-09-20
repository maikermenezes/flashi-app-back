import { EntityRepository, Repository } from "typeorm";
import { Card } from "../models";

@EntityRepository(Card)
export default class DeckRepository extends Repository<Card> {
  public async findById(id: string): Promise<Card | false | string> {
    try {
      const card = await this.findOne(id);

      if (!card) {
        return false;
      }

      return card;
    } catch (error) {
      return error.severity || error;
    }
  }
}
