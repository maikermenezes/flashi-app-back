import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;
}
