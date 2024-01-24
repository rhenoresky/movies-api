import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Get(':id')
  async getLike(@Param() id: string) {
    return this.likeService.getLike(id);
  }

  @Put(':id')
  async changeLike(@Param() id: string, @Body() userId: string) {
    const result = await this.likeService.checkLike({ id, userId });
    if (!result) {
      await this.likeService.addLike({ id, userId });
      return {
        message: 'success add like',
      };
    }

    await this.likeService.deleteLike(result.id);
    return {
      message: 'success delete like',
    };
  }
}
