import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from '../genre/genre.entity';

@Entity()
export class Film {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'int', nullable: true })
  year?: number | null;

  @Column({ type: 'text', nullable: true })
  posterUrl?: string | null;

  @ManyToMany(() => Genre, (genre) => genre.films, { cascade: false })
  @JoinTable()
  genres: Genre[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
