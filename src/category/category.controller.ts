import { Body, Delete, Controller, Post, Param, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoriesDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async addCategory(@Body() dto: CategoriesDto) {
    const category = await this.categoryService.addCategory(dto);
    return {
      message: 'success',
      category,
    };
  }

  @Put(':id')
  async editCategory(@Param() id: number, @Body() dto: CategoriesDto) {
    const category = await this.categoryService.editCategory({
      id,
      name: dto.name,
    });
    return {
      message: 'success',
      data: category,
    };
  }

  @Delete(':id')
  async deleteCategory(@Param() id: number) {
    await this.categoryService.deleteCategory(id);

    return {
      message: 'success',
    };
  }
}
