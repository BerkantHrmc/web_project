# create-profil.dto.ts

## Amaç

Yeni profil oluşturma için gelen verilerin doğrulanmasını sağlar.

## Temel Bileşenler

### `CreateProfileDto` Sınıfı

### Alanlar

#### `username: string`
- **Açıklama**: Kullanıcı adı
- **Validasyon**: 
  - `@IsNotEmpty({ message: 'Kullanıcı adı boş olamaz' })` - Boş olamaz
  - `@IsString()` - String olmalı
- **Zorunlu**: Evet

#### `email: string`
- **Açıklama**: E-posta adresi
- **Validasyon**: 
  - `@IsNotEmpty({ message: 'Email boş olamaz' })` - Boş olamaz
  - `@IsEmail({}, { message: 'Geçerli bir email adresi giriniz' })` - Geçerli email formatı
  - `@IsString()` - String olmalı
- **Zorunlu**: Evet

#### `password: string`
- **Açıklama**: Kullanıcı şifresi
- **Validasyon**: 
  - `@IsNotEmpty({ message: 'Şifre boş olamaz' })` - Boş olamaz
  - `@MinLength(8, { message: 'Şifre en az 8 karakter olmalıdır' })` - En az 8 karakter
  - `@Matches()` - Regex ile karmaşıklık kontrolü
  - `@IsString()` - String olmalı
- **Regex**: `/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/`
  - En az 1 büyük harf
  - En az 1 küçük harf
  - En az 1 sayı veya sembol
- **Zorunlu**: Evet

#### `confirmPassword: string`
- **Açıklama**: Şifre tekrarı
- **Validasyon**: 
  - `@IsNotEmpty({ message: 'Şifre tekrarı boş olamaz' })` - Boş olamaz
  - `@IsString()` - String olmalı
- **Zorunlu**: Evet
- **Not**: Şifre eşleşme kontrolü servis katmanında yapılır

#### `profileTypeId: number`
- **Açıklama**: Profil türü (rol) ID'si
- **Validasyon**: `@IsNotEmpty({ message: 'Profil tipi boş olamaz' })` - Boş olamaz
- **Zorunlu**: Evet

## Kullanım

```typescript
POST /profiles
Content-Type: multipart/form-data
{
  username: "kullanici",
  email: "kullanici@example.com",
  password: "Sifre123!",
  confirmPassword: "Sifre123!",
  profileTypeId: 1,
  photo: File
}
```

## Validasyon Kuralları

- Tüm alanlar zorunludur
- Email geçerli format olmalı
- Şifre en az 8 karakter ve karmaşık olmalı
- Şifre eşleşme kontrolü servis katmanında yapılır

