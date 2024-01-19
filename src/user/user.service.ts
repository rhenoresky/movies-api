import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(credentials: any) {
    return await this.prisma.user.findUnique({
      where: {
        id: credentials.id,
      },
    });
  }

  async editProfile(credentials: any, user: UserDto) {
    if (user.password) {
      console.log(user.password);
      const hash = await argon.hash(user.password);
      user.password = hash;
      console.log(user.password);
    }
    return await this.prisma.user.update({
      where: {
        id: credentials.id,
      },
      data: {
        ...user,
      },
    });
  }
}
