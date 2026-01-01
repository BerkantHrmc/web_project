# profil.controller.ts

## Amaç

Profil yönetimi için HTTP endpoint'lerini tanımlar. Dosya yükleme (Multer) desteği içerir.

## Temel Bileşenler

### `ProfileController` Sınıfı

- `@Controller('profiles')`: `/profiles` path'i için controller

### Endpoints

#### `GET /profiles`
- **Açıklama**: Tüm profilleri listeler
- **Yanıt**: Profil array'i (profileType ilişkisiyle)
- **Yetkilendirme**: `JwtAuthGuard` gerekli (tüm kullanıcılar)

#### `GET /profiles/:id`
- **Açıklama**: Belirli bir profilin detaylarını getirir
- **Parametre**: `id` (string)
- **Yanıt**: Profil objesi (profileType ilişkisiyle)
- **Yetkilendirme**: `JwtAuthGuard` + `RolesGuard` + `@Roles('Yönetici')`

#### `POST /profiles`
- **Açıklama**: Yeni profil oluşturur
- **Body**: `CreateProfileDto` (FormData formatında)
- **File**: `photo` (Multer ile yüklenir)
- **Yanıt**: Oluşturulan profil
- **Yetkilendirme**: `JwtAuthGuard` + `RolesGuard` + `@Roles('Yönetici')`
- **Not**: Fotoğraf yüklemek zorunludur

#### `PATCH /profiles/:id`
- **Açıklama**: Mevcut profili günceller
- **Parametre**: `id` (string)
- **Body**: FormData (username, email, password, confirmPassword, profileTypeId)
- **File**: `photo` (opsiyonel, Multer ile yüklenir)
- **Yanıt**: Güncellenmiş profil
- **Yetkilendirme**: 
  - Kendi profili: `JwtAuthGuard` (rol değiştiremez)
  - Başkasının profili: `JwtAuthGuard` + Yönetici kontrolü
- **Özellik**: FormData'dan gelen veriler parse edilir

#### `DELETE /profiles/:id`
- **Açıklama**: Profil siler
- **Parametre**: `id` (string)
- **Yanıt**: Silinen profil
- **Yetkilendirme**: 
  - Kendi profili: `JwtAuthGuard`
  - Başkasının profili: `JwtAuthGuard` + Yönetici kontrolü

## Dosya Yükleme

- **Multer**: `FileInterceptor('photo')` kullanılır
- **Klasör**: `./uploads`
- **Dosya Adı**: `photo-{timestamp}-{random}.{ext}`
- **URL**: `http://localhost:3000/uploads/{filename}`

## FormData İşleme

`PATCH /profiles/:id` endpoint'i FormData kabul eder:
- `username`: String
- `email`: String
- `password`: String (opsiyonel)
- `confirmPassword`: String (opsiyonel)
- `profileTypeId`: String/Number (opsiyonel, sadece Yönetici)
- `photo`: File (opsiyonel)

## Kullanım Örnekleri

```typescript
// Profil listeleme
GET /profiles
Headers: Authorization: Bearer {token}

// Profil oluşturma (Yönetici)
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

// Profil güncelleme
PATCH /profiles/1
Content-Type: multipart/form-data
{
  username: "yeni_kullanici",
  profileTypeId: 2,
  photo: File (opsiyonel)
}
```

