import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import Card from './Card';

@Entity()
export default class Deck {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('uuid')
    cardId: string;

}
