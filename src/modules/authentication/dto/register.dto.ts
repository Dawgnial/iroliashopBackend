import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  name?: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsPhoneNumber(null)  // null یعنی هر کشور پذیرفته میشه، می‌تونی 'IR' هم بزنی
  phone?: string;
}
