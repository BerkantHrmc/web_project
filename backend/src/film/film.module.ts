import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '../genre/genre.entity';
import { FilmController } from './film.controller';
import { Film } from './film.entity';
import { FilmService } from './film.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Genre])],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
