# register.dto.ts

## Amaç

Yeni kullanıcı kaydı için gelen verilerin doğrulanmasını sağlar.

## Temel Bileşenler

### `RegisterDto` Sınıfı

### Alanlar

#### `username: string`
- **Açıklama**: Kullanıcı adı
- **Validasyon**: `@IsString()` - String olmalı
- **Zorunlu**: Evet

#### `email: string`
- **Açıklama**: E-posta adresi
- **Validasyon**: `@IsEmail()` - Geçerli email formatı olmalı
- **Zorunlu**: Evet

#### `password: string`
- **Açıklama**: Kullanıcı şifresi
- **Validasyon**: 
  - `@IsString()` - String olmalı
  - `@MinLength(8)` - En az 8 karakter
  - `@Matches()` - Regex ile karmaşıklık kontrolü
- **Regex**: `/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/`
  - En az 1 büyük harf
  - En az 1 küçük harf
  - En az 1 sayı veya sembol
- **Zorunlu**: Evet

#### `confirmPassword: string`
- **Açıklama**: Şifre tekrarı
- **Validasyon**: `@IsString()` - String olmalı
- **Zorunlu**: Evet
- **Not**: Şifre eşleşme kontrolü servis katmanında yapılır

## Kullanım

```typescript
POST /auth/register
{
  "username": "kullanici",
  "email": "kullanici@example.com",
  "password": "Sifre123!",
  "confirmPassword": "Sifre123!"
}
```

## Validasyon Kuralları

- Email geçerli format olmalı
- Şifre en az 8 karakter
- Şifre en az 1 büyük harf, 1 küçük harf, 1 sayı/sembol içermeli
- Geçersiz veri için `400 Bad Request` döner

