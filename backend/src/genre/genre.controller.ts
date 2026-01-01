import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { CreateGenreDto } from './create-genre.dto';
import { UpdateGenreDto } from './update-genre.dto';
import { GenreService } from './genre.service';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Yönetici')
  @Post()
  create(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Yönetici')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGenreDto) {
    return this.genreService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Yönetici')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.remove(id);
  }
}
