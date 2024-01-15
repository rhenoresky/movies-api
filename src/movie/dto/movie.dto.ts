import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class MovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  release: string;
}

export class EditMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsString()
  @IsOptional()
  release?: string;
}

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  category: string[];
}
