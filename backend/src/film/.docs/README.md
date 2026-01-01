# Film Modülü

## Amaç

Film yönetimi için CRUD işlemlerini sağlar. Filmler ve türler (genres) arasında many-to-many ilişki yönetir.

## Klasör Yapısı

- **film.controller.ts**: Film endpoint'leri
- **film.service.ts**: Film iş mantığı
- **film.entity.ts**: Film entity tanımı
- **film.module.ts**: Film modül yapılandırması
- **dto/**: Data Transfer Object'ler (CreateFilmDto, UpdateFilmDto)

## Özellikler

- Film listeleme (tüm kullanıcılar)
- Film detay görüntüleme (tüm kullanıcılar)
- Film oluşturma (sadece Yönetici)
- Film güncelleme (sadece Yönetici)
- Film silme (sadece Yönetici)
- Film-tür ilişkisi yönetimi

## Yetkilendirme

- **GET** endpoint'leri: Tüm kullanıcılar erişebilir
- **POST, PATCH, DELETE** endpoint'leri: Sadece Yönetici rolü erişebilir

## İlişkiler

- **Film ↔ Genre**: Many-to-many ilişki
- Bir film birden fazla türe sahip olabilir
- Bir tür birden fazla filmde kullanılabilir

