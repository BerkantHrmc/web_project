import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Film } from '../film/film.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Film, (film) => film.genres)
  films: Film[];
}
