import { IsNotEmpty, IsString } from 'class-validator';

export class ParseEmailDto {
  @IsString()
  @IsNotEmpty()
  source: string;
}
