import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  authorName: string;

  @IsNotEmpty()
  @IsNumber()
  publicationYear: number;

  @IsNotEmpty()
  @IsString()
  ISBN: string;

  @IsNotEmpty()
  @IsNumber()
  numOfPages: number;
}
