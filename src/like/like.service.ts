import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async getLike(id: string) {
    return await this.prisma.likeMovie.count({
      where: {
        movieId: id,
      },
    });
  }

  async checkLike(data: { id: string; userId: string }) {
    return await this.prisma.likeMovie.findFirst({
      where: {
        movieId: data.id,
        userId: data.userId,
      },
      select: {
        id: true,
      },
    });
  }

  async addLike(data: { id: string; userId: string }) {
    await this.prisma.likeMovie.create({
      data: {
        movieId: data.id,
        userId: data.userId,
      },
    });
  }

  async deleteLike(id: number) {
    await this.prisma.likeMovie.delete({
      where: {
        id,
      },
    });
  }
}
