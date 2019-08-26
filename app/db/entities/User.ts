import {
  Entity,
  Column,
  PrimaryColumn,
  // BaseEntity,
} from 'typeorm';

@Entity('users')
export class User {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @PrimaryColumn()
  email: string;

  constructor(initalState?: any) {
    if (initalState) {
      Object.assign(this, initalState);
    }
  }
}
