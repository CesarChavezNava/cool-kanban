import { CreateBoardDto } from './create-board.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsUrl } from 'class-validator';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {
  @IsUrl()
  @IsOptional()
  urlImage: string;
}
