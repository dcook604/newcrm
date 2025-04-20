// @ts-ignore
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Unit {
  constructor(init?: Partial<Unit>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  number?: string;

  @Column()
  floor?: string;

  @Column()
  size?: number;

  @Column()
  bedrooms?: number;

  @Column()
  bathrooms?: number;

  @Column()
  lockers?: number;

  @Column()
  parkingSpots?: number;

  @Column()
  bikeStorage?: number;
}