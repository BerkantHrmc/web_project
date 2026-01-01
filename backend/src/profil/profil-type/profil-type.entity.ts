import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProfileType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
