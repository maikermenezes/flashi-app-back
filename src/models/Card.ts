import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Deck from "./Deck";

@Entity()
export default class Card {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  phrase: string;

  @Column("text", { nullable: true })
  translation: string;

  @Column("text", { nullable: true })
  image: string;

  @Column()
  deckId: string;

  @ManyToOne(() => Deck)
  @JoinColumn({ name: "deckId" })
  deck: Deck;
}
