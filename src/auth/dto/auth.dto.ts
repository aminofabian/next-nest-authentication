/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
