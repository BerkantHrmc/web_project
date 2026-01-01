# Auth DTO Klasörü

## Amaç

Auth modülü için Data Transfer Object'ler (DTO) tanımlarını içerir. Gelen request verilerinin doğrulanması ve tip güvenliği için kullanılır.

## Dosyalar

- **login.dto.ts**: Giriş için DTO
- **register.dto.ts**: Kayıt için DTO

## Özellikler

- `class-validator` decorator'ları ile validasyon
- TypeScript tip güvenliği
- Otomatik validasyon (ValidationPipe ile)

