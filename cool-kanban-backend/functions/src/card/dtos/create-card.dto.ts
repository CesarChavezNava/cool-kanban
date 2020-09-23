import { IsDateString, IsOptional, IsString } from 'class-validator';

import { Priority } from '../../core/types/priority.type';

export class CreateCardDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate: Date;

  @IsString()
  idList: string;

  @IsString()
  priority: Priority;

  @IsString()
  title: string;
}
