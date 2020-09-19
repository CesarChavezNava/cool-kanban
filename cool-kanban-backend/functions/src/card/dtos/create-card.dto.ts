import { IsString, IsDateString } from 'class-validator';
import { Priority } from '../../core/types/priority.type';

export class CreateCardDto {
  @IsString()
  description: string;

  @IsString()
  idList: string;

  @IsString()
  title: string;

  @IsString()
  priority: Priority;

  @IsDateString()
  dueDate: Date;
}
