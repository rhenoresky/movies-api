import { IsNotEmpty, IsString } from 'class-validator';

export class ImageDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
