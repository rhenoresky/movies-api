import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { IdGeneratorModule } from './id-generator/id-generator.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    IdGeneratorModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    MovieModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
