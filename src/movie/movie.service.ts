import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IdGeneratorService } from 'src/id-generator/id-generator.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryDto, EditMovieDto, MovieDto } from './dto';

@Injectable()
export class MovieService {
  constructor(
    private prisma: PrismaService,
    private idGenerator: IdGeneratorService,
  ) {}

  async addMovie(movie: MovieDto) {
    const id = `movie-${this.idGenerator.generateId()}`;
    const result = await this.prisma.movie.create({
      data: {
        id,
        ...movie,
        image: null,
      },
      select: {
        id: true,
      },
    });

    return result;
  }

  async addImage(id: string, image: string) {
    await this.checkMovie(id);
    await this.prisma.movie.update({
      data: {
        image,
      },
      where: {
        id,
      },
    });
  }

  async getMovies() {
    return await this.prisma.movie.findMany({
      select: {
        id: true,
        title: true,
        image: true,
      },
    });
  }

  async getMovieById(id: string) {
    const result = await this.prisma.movie.findUnique({
      where: {
        id,
      },
    });

    const category = await this.prisma
      .$queryRaw`SELECT c.name FROM "MovieCategory" AS m INNER JOIN "Category" AS c ON m."categoryId" = c.id WHERE m."movieId" = ${id}`;

    return {
      ...result,
      category,
    };
  }

  async addMovieCategory(movie: CategoryDto) {
    await this.prisma.movieCategory.deleteMany({
      where: {
        movieId: movie.id,
      },
    });
    for (let i = 0; i < movie.category.length; i++) {
      const category = await this.prisma.category.findFirst({
        where: {
          name: movie.category[i],
        },
        select: {
          id: true,
        },
      });

      if (!category) throw new BadRequestException('category not found');

      await this.prisma.movieCategory.create({
        data: {
          movieId: movie.id,
          categoryId: category.id,
        },
      });
    }
  }

  async editMovieById(id: string, editMovie: EditMovieDto) {
    return await this.prisma.movie.update({
      where: {
        id,
      },
      data: {
        ...editMovie,
      },
    });
  }

  async deleteMovieById(id: string) {
    await this.prisma.movie.delete({
      where: {
        id,
      },
    });
  }

  async checkMovie(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    if (!movie) throw new NotFoundException('movie not found');
  }
}
