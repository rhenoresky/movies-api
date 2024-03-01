import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriesDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async addCategory(dto: CategoriesDto) {
    return await this.prisma.category.create({
      data: {
        ...dto,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getCategory() {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async editCategory({ id, name }) {
    await this.prisma.category.update({
      data: {
        name,
      },
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async deleteCategory(id: number) {
    await this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
