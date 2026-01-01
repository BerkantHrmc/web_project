import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFilmDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1888)
  @Max(2100)
  year?: number;

  @IsOptional()
  @IsUrl({ require_tld: false })
  posterUrl?: string;

  // Film-Genre (many-to-many) yönetimi için
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  genreIds?: number[];
}
