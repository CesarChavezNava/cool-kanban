import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsEmail()
  email: string;

  @IsUrl()
  @IsOptional()
  urlImage: string;

  @IsString()
  username: string;
}
