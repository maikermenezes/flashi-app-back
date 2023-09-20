import { EntityRepository, Repository } from "typeorm";
import { Deck } from "../models";

@EntityRepository(Deck)
export default class DeckRepository extends Repository<Deck> {
  public async findById(id: string): Promise<Deck | false | string> {
    try {
      const deck = await this.findOne(id);

      if (!deck) {
        return false;
      }

      return deck;
    } catch (error) {
      return error.severity || error;
    }
  }
}
