import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Get(':id')
  async getLike(@Param() id: string) {
    return this.likeService.getLike(id);
  }

  @UseGuards(AuthGuard('auth-jwt'))
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
