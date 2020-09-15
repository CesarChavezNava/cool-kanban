import { IsString } from 'class-validator';
import { Privacy } from '../../core/types/privacy.type';

export class CreateBoardDto {
  @IsString()
  name: string;

  @IsString()
  privacy: Privacy;
}
