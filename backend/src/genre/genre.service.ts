import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './create-genre.dto';
import { UpdateGenreDto } from './update-genre.dto';
import { Genre } from './genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  findAll() {
    return this.genreRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: number) {
    const genre = await this.genreRepository.findOne({ where: { id } });
    if (!genre) throw new NotFoundException('Tür bulunamadı');
    return genre;
  }

  async create(dto: CreateGenreDto) {
    const existing = await this.genreRepository.findOne({
      where: { name: dto.name },
    });
    if (existing) throw new BadRequestException('Bu tür zaten var');
    const genre = this.genreRepository.create({ name: dto.name });
    return this.genreRepository.save(genre);
  }

  async update(id: number, dto: UpdateGenreDto) {
    const genre = await this.findOne(id);
    if (dto.name !== undefined) {
      genre.name = dto.name;
    }
    return this.genreRepository.save(genre);
  }

  async remove(id: number) {
    const genre = await this.findOne(id);
    return this.genreRepository.remove(genre);
  }
}
