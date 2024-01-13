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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { Response } from 'express';
import { MovieService } from './movie.service';
import { CategoryDto, EditMovieDto, MovieDto } from './dto';
import { ImageDto } from './dto/image.dto';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

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

  @Put(':id')
  async editMovieById(
    @Param('id') id: string,
    @Body() editMovie: EditMovieDto,
  ) {
    return this.movieService.editMovieById(id, editMovie);
  }

  @Delete(':id')
  async deleteMovieById(@Param('id') id: string) {
    await this.movieService.deleteMovieById(id);
    return {
      message: `success delete movie ${id}`,
    };
  }

  @Post('category')
  async addMovieCategory(@Body() movie: CategoryDto) {
    await this.movieService.addMovieCategory(movie);
    return {
      message: 'success',
    };
  }

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'files',
        filename: (req, image, callback) => {
          const filename = `${basename(
            image.originalname,
            extname(image.originalname),
          )}-${Date.now()}${extname(image.originalname)}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async addImage(
    @Body() movie: ImageDto,
    @UploadedFile() image: any,
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
