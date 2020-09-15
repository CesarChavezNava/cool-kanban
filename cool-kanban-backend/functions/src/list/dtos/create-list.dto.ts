import { IsString, Length } from 'class-validator';

export class CreateListDto {
  @IsString()
  idBoard: string;

  @IsString()
  @Length(10, 50)
  name: string;
}
