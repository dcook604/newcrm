// @ts-ignore
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  email?: string;

  @Column()
  password?: string;

  @Column()
  name?: string;

  @Column({ type: 'enum', enum: ['admin', 'manager', 'viewer'] })
  role?: 'admin' | 'manager' | 'viewer';

  @Column({ default: false })
  approved?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: string;
}