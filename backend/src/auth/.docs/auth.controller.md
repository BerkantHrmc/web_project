# auth.controller.ts

## Amaç

Kimlik doğrulama işlemleri için HTTP endpoint'lerini tanımlar.

## Temel Bileşenler

### `AuthController` Sınıfı

- `@Controller('auth')`: `/auth` path'i için controller

### Endpoints

#### `POST /auth/register`
- **Açıklama**: Yeni kullanıcı kaydı
- **Body**: `RegisterDto` (username, email, password, confirmPassword)
- **Yanıt**: Kayıtlı kullanıcı bilgileri (şifre hariç)
- **Yetkilendirme**: Gerekmez (public)

#### `POST /auth/login`
- **Açıklama**: Kullanıcı girişi
- **Body**: `LoginDto` (username, password)
- **Yanıt**: `{ access_token: string, user: Profile }`
- **Yetkilendirme**: Gerekmez (public)

#### `GET /auth/me`
- **Açıklama**: Giriş yapmış kullanıcının bilgilerini getirir
- **Headers**: `Authorization: Bearer {token}`
- **Yanıt**: Kullanıcı bilgileri (şifre hariç)
- **Yetkilendirme**: `JwtAuthGuard` gerekli

### Bağımlılıklar

- `AuthService`: Tüm iş mantığı bu serviste

## Kullanım Örnekleri

```typescript
// Kayıt
POST /auth/register
{
  "username": "kullanici",
  "email": "kullanici@example.com",
  "password": "Sifre123!",
  "confirmPassword": "Sifre123!"
}

// Giriş
POST /auth/login
{
  "username": "kullanici",
  "password": "Sifre123!"
}

// Kullanıcı bilgisi
GET /auth/me
Headers: Authorization: Bearer {token}
```

