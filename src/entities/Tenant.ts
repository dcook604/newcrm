// @ts-ignore
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tenant {
  constructor(init?: Partial<Tenant>) {
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
  leaseStart?: string;

  @Column()
  leaseEnd?: string;

  @Column()
  hasDog?: boolean;

  @Column()
  hasCat?: boolean;
}