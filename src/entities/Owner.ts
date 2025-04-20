// @ts-ignore
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Owner {
  constructor(init?: Partial<Owner>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  unitId?: string;

  @Column()
  firstName?: string;

  @Column()
  lastName?: string;

  @Column()
  email?: string;

  @Column()
  phone?: string;

  @Column()
  mailingAddress?: string;

  @Column()
  hasDog?: boolean;

  @Column()
  hasCat?: boolean;
}