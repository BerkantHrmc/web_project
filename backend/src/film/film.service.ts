import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Genre } from '../genre/genre.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './film.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  findAll() {
    return this.filmRepository.find({
      relations: ['genres'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['genres'],
    });

    if (!film) {
      throw new NotFoundException('Film bulunamadı');
    }
    return film;
  }

  async create(dto: CreateFilmDto) {
    const film = this.filmRepository.create({
      title: dto.title,
      description: dto.description ?? null,
      year: dto.year ?? null,
      posterUrl: dto.posterUrl ?? null,
    });
    if (dto.genreIds && dto.genreIds.length > 0) {
      film.genres = await this.loadGenres(dto.genreIds);
    }
    return this.filmRepository.save(film);
  }

  async update(id: number, dto: UpdateFilmDto) {
    const film = await this.findOne(id);
    Object.assign(film, {
      ...(dto.title !== undefined ? { title: dto.title } : {}),
      ...(dto.description !== undefined
        ? { description: dto.description }
        : {}),
      ...(dto.year !== undefined ? { year: dto.year } : {}),
      ...(dto.posterUrl !== undefined ? { posterUrl: dto.posterUrl } : {}),
    });
    if (dto.genreIds !== undefined) {
      film.genres = await this.loadGenres(dto.genreIds);
    }
    return this.filmRepository.save(film);
  }

  async remove(id: number) {
    const film = await this.findOne(id);
    return this.filmRepository.remove(film);
  }

  private async loadGenres(genreIds: number[]) {
    const unique = Array.from(new Set(genreIds));
    if (unique.length === 0) return [];

    const genres = await this.genreRepository.find({
      where: { id: In(unique) },
      order: { name: 'ASC' },
    });
    if (genres.length !== unique.length) {
      throw new NotFoundException('Geçersiz genreIds');
    }
    return genres;
  }
}
