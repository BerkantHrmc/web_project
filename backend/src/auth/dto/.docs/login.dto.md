# login.dto.ts

## Amaç

Kullanıcı girişi için gelen verilerin doğrulanmasını sağlar.

## Temel Bileşenler

### `LoginDto` Sınıfı

### Alanlar

#### `username: string`
- **Açıklama**: Kullanıcı adı
- **Validasyon**: `@IsString()` - String olmalı
- **Zorunlu**: Evet

#### `password: string`
- **Açıklama**: Kullanıcı şifresi
- **Validasyon**: `@IsString()` - String olmalı
- **Zorunlu**: Evet

## Kullanım

```typescript
POST /auth/login
{
  "username": "kullanici",
  "password": "Sifre123!"
}
```

## Validasyon

- `ValidationPipe` otomatik olarak doğrulama yapar
- Geçersiz veri için `400 Bad Request` döner

