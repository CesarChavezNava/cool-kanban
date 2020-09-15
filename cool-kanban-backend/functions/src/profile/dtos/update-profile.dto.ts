import { IsEmail, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsEmail()
  email: string;

  @IsUrl()
  urlImage: string;

  @IsString()
  username: string;
}
