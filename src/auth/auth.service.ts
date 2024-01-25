import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, AuthDtoReg } from './dto';
import * as argon from 'argon2';
import { IdGeneratorService } from 'src/id-generator/id-generator.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private idGenerator: IdGeneratorService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDtoReg): Promise<object> {
    await this.checkUserExist(dto.email);
    const id = `user-${this.idGenerator.generateId()}`;
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        id,
        email: dto.email,
        name: dto.name,
        password: hash,
      },
    });

    delete user.password;

    return {
      message: 'success',
      data: {
        ...user,
      },
    };
  }

  async signin(dto: AuthDto): Promise<object> {
    const user = await this.findUser(dto.email);
    const pwMatches = await argon.verify(user.password, dto.password);
    if (!pwMatches) throw new ForbiddenException('Incorrect Password');
    const token = await this.signToken(user.id);
    delete user.password;
    return {
      ...user,
      token,
    };
  }

  async checkUserExist(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) throw new BadRequestException('User Already Exist');
  }

  async findUser(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) throw new ForbiddenException('wrong email');

    return user;
  }

  async signToken(userId: string): Promise<string> {
    const payload = {
      sub: userId,
    };

    return await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: this.config.get('TOKEN_SECRET'),
    });
  }
}
