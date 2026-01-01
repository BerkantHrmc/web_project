import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsString,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'Kullanıcı adı boş olamaz' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Email boş olamaz' })
  @IsEmail({}, { message: 'Geçerli bir email adresi giriniz' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Şifre boş olamaz' })
  @MinLength(8, { message: 'Şifre en az 8 karakter olmalıdır' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Şifre en az 1 büyük harf, 1 küçük harf, 1 sayı ve 1 sembol içermelidir.',
  })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Şifre tekrarı boş olamaz' })
  @IsString()
  confirmPassword: string;

  @IsNotEmpty({ message: 'Profil tipi boş olamaz' })
  profileTypeId: number;
}
