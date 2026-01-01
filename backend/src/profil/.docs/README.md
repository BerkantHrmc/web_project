# Profil Modülü

## Amaç

Kullanıcı profil yönetimi için CRUD işlemlerini sağlar. Profil fotoğrafı yükleme, rol yönetimi ve kullanıcı bilgileri güncelleme işlevlerini içerir.

## Klasör Yapısı

- **profil.controller.ts**: Profil endpoint'leri
- **profil.service.ts**: Profil iş mantığı
- **profil.entity.ts**: Profil entity tanımı
- **dto/**: Data Transfer Object'ler (CreateProfileDto)
- **profil-type/**: Profil türleri (rol) yönetimi alt modülü

## Özellikler

- Profil listeleme (tüm kullanıcılar)
- Profil detay görüntüleme (Yönetici)
- Profil oluşturma (Yönetici)
- Profil güncelleme (kendi profili veya Yönetici)
- Profil silme (kendi profili veya Yönetici)
- Profil fotoğrafı yükleme (Multer ile)
- Rol (ProfileType) yönetimi

## Yetkilendirme

- **GET /profiles**: Tüm kullanıcılar erişebilir
- **GET /profiles/:id**: Sadece Yönetici
- **POST /profiles**: Sadece Yönetici
- **PATCH /profiles/:id**: Kendi profili veya Yönetici
- **DELETE /profiles/:id**: Kendi profili veya Yönetici

## İlişkiler

- **Profile ↔ ProfileType**: Many-to-one ilişki
- Her profil bir profil türüne (rol) sahiptir
- Profil türleri: Yönetici, Standart Kullanıcı, Misafir

