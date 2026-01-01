# Genre Modülü

## Amaç

Film türleri (genre) yönetimi için CRUD işlemlerini sağlar.

## Klasör Yapısı

- **genre.controller.ts**: Genre endpoint'leri
- **genre.service.ts**: Genre iş mantığı
- **genre.entity.ts**: Genre entity tanımı
- **genre.module.ts**: Genre modül yapılandırması
- **create-genre.dto.ts**: Genre oluşturma DTO
- **update-genre.dto.ts**: Genre güncelleme DTO
- **dto/**: DTO klasörü (alternatif konum)

## Özellikler

- Genre listeleme (tüm kullanıcılar)
- Genre detay görüntüleme (tüm kullanıcılar)
- Genre oluşturma (sadece Yönetici)
- Genre güncelleme (sadece Yönetici)
- Genre silme (sadece Yönetici)
- Benzersizlik kontrolü (aynı isimde genre olamaz)

## Yetkilendirme

- **GET** endpoint'leri: Tüm kullanıcılar erişebilir
- **POST, PATCH, DELETE** endpoint'leri: Sadece Yönetici rolü erişebilir

## İlişkiler

- **Genre ↔ Film**: Many-to-many ilişki
- Bir tür birden fazla filmde kullanılabilir
- Bir film birden fazla türe sahip olabilir

