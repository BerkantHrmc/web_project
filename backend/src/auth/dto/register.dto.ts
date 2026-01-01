import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Şifre en az 1 büyük harf, 1 küçük harf, 1 sayı ve 1 sembol içermelidir.',
  })
  password: string;

  @IsString()
  confirmPassword: string;
}
