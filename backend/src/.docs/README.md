# Backend Source Klasörü

Bu klasör, NestJS tabanlı backend uygulamasının ana kaynak kodlarını içerir.

## Genel Amaç

Backend uygulaması, film yönetim sistemi için RESTful API sağlar. Kullanıcı kimlik doğrulama, profil yönetimi, film ve tür (genre) yönetimi gibi işlevleri içerir.

## Klasör Yapısı

- **auth/**: Kullanıcı kimlik doğrulama ve yetkilendirme modülü
- **film/**: Film yönetimi modülü
- **genre/**: Film türleri (genre) yönetimi modülü
- **profil/**: Kullanıcı profil yönetimi modülü
- **app.module.ts**: Ana uygulama modülü
- **app.controller.ts**: Ana controller
- **app.service.ts**: Ana servis
- **main.ts**: Uygulama giriş noktası

## Teknolojiler

- **NestJS**: Node.js framework
- **TypeORM**: ORM (Object-Relational Mapping)
- **SQLite**: Veritabanı
- **JWT**: Token tabanlı kimlik doğrulama
- **Passport**: Kimlik doğrulama stratejileri
- **bcrypt**: Şifre hashleme
- **Multer**: Dosya yükleme

## Modüller

### Auth Modülü
Kullanıcı kayıt, giriş ve JWT token yönetimi.

### Film Modülü
Film CRUD işlemleri ve film-tür ilişkileri.

### Genre Modülü
Film türleri (genre) CRUD işlemleri.

### Profil Modülü
Kullanıcı profil yönetimi, rol yönetimi ve fotoğraf yükleme.

