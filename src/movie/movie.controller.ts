import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Get,
  Param,
  Res,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MovieService } from './movie.service';
import { CategoryDto, EditMovieDto, MovieDto } from './dto';
import { ImageDto } from './dto/image.dto';
import { AuthGuard } from '@nestjs/passport';
import { storageConfig } from './helper/multerConfig';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @UseGuards(AuthGuard('auth-jwt'))
  @Post()
  async addMovie(@Body() movie: MovieDto): Promise<object> {
    const data = await this.movieService.addMovie(movie);
    return {
      data,
    };
  }

  @Get()
  async getMovies() {
    return await this.movieService.getMovies();
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    return await this.movieService.getMovieById(id);
  }

  @UseGuards(AuthGuard('auth-jwt'))
  @Put(':id')
  async editMovieById(
    @Param('id') id: string,
    @Body() editMovie: EditMovieDto,
  ) {
    return this.movieService.editMovieById(id, editMovie);
  }

  @UseGuards(AuthGuard('auth-jwt'))
  @Delete(':id')
  async deleteMovieById(@Param('id') id: string) {
    await this.movieService.deleteMovieById(id);
    return {
      message: `success delete movie ${id}`,
    };
  }

  @UseGuards(AuthGuard('auth-jwt'))
  @Post('category')
  async addMovieCategory(@Body() movie: CategoryDto) {
    await this.movieService.addMovieCategory(movie);
    return {
      message: 'success',
    };
  }

  @UseGuards(AuthGuard('auth-jwt'))
  @Post('image')
  @UseInterceptors(FileInterceptor('image', storageConfig))
  async addImage(
    @Body() movie: ImageDto,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<object> {
    const path = `http://localhost:3000/movie/image/${image.filename}`;
    await this.movieService.addImage(movie.id, path);
    return {
      path,
    };
  }

  @Get('image/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const file = filename;
    res.sendFile(file, { root: './files' });
  }
}
