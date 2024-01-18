import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('auth-jwt'))
  @Get('me')
  async getMe(@Req() req: Request) {
    return await this.userService.getMe(req.user);
  }

  @UseGuards(AuthGuard('auth-jwt'))
  @Put('me')
  async editProfile(@Req() req: Request, @Body() user: UserDto) {
    return await this.userService.editProfile(req.user, user);
  }
}
