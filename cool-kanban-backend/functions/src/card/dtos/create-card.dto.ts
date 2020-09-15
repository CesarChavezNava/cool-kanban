import { IsString, IsDate, Length } from 'class-validator';
import { Priority } from '../../core/types/priority.type';

export class CreateCardDto {
  @IsString()
  @Length(10, 250)
  description: string;

  @IsString()
  idList: string;

  @IsString()
  @Length(10, 50)
  title: string;

  @IsString()
  priority: Priority;

  @IsDate()
  dueDate: Date;
}
