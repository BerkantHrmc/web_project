import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProfileType } from './profil-type/profil-type.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  photo: string;

  @ManyToOne(() => ProfileType, { eager: false })
  @JoinColumn({ name: 'profileTypeId' })
  profileType: ProfileType;

  @Column()
  profileTypeId: number;
}
