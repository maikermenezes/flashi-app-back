import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import Deck from './Deck';

@Entity()
export default class Card {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    phrase: string;

    @Column('text', { nullable: true })
    translation: string;

    @Column('text', { nullable: true })
    image: string;

    @ManyToOne(() => Deck, (deck) => deck)
    deck: Deck;
    
}
