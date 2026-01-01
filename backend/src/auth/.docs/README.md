# Auth Modülü

## Amaç

Kullanıcı kimlik doğrulama (authentication) ve yetkilendirme (authorization) işlemlerini yönetir. JWT token tabanlı kimlik doğrulama sistemi sağlar.

## Klasör Yapısı

- **auth.controller.ts**: Auth endpoint'leri
- **auth.service.ts**: Auth iş mantığı
- **auth.module.ts**: Auth modül yapılandırması
- **jwt.strategy.ts**: JWT token doğrulama stratejisi
- **jwt-auth.guard.ts**: JWT guard (koruma)
- **roles.decorator.ts**: Rol bazlı yetkilendirme decorator'ı
- **roles.guard.ts**: Rol bazlı yetkilendirme guard'ı
- **dto/**: Data Transfer Object'ler (LoginDto, RegisterDto)

## Özellikler

- Kullanıcı kayıt (register)
- Kullanıcı giriş (login)
- JWT token üretimi ve doğrulama
- Şifre hashleme (bcrypt)
- Rol bazlı erişim kontrolü
- Kullanıcı bilgilerini getirme (`/auth/me`)

## Güvenlik

- Şifreler bcrypt ile hashlenir
- JWT token'lar 7 gün geçerlidir
- Token'lar Bearer token formatında gönderilir
- Rol bazlı yetkilendirme ile endpoint koruması

