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
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmService } from './film.service';

@Controller('films')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  findAll() {
    return this.filmService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.filmService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Yönetici')
  create(@Body() dto: CreateFilmDto) {
    return this.filmService.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Yönetici')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFilmDto) {
    return this.filmService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Yönetici')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filmService.remove(id);
  }
}
