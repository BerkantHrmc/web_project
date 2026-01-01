# genre.controller.ts

## Amaç

Genre yönetimi için HTTP endpoint'lerini tanımlar.

## Temel Bileşenler

### `GenreController` Sınıfı

- `@Controller('genres')`: `/genres` path'i için controller

### Endpoints

#### `GET /genres`
- **Açıklama**: Tüm türleri listeler
- **Yanıt**: Genre array'i
- **Sıralama**: İsme göre artan (ASC)
- **Yetkilendirme**: Gerekmez (public)

#### `GET /genres/:id`
- **Açıklama**: Belirli bir türün detaylarını getirir
- **Parametre**: `id` (number)
- **Yanıt**: Genre objesi
- **Hata**: Tür bulunamazsa `404 Not Found`
- **Yetkilendirme**: Gerekmez (public)

#### `POST /genres`
- **Açıklama**: Yeni tür oluşturur
- **Body**: `CreateGenreDto`
- **Yanıt**: Oluşturulan tür
- **Yetkilendirme**: `JwtAuthGuard` + `RolesGuard` + `@Roles('Yönetici')`
- **Hata**: Aynı isimde tür varsa `400 Bad Request`

#### `PATCH /genres/:id`
- **Açıklama**: Mevcut türü günceller
- **Parametre**: `id` (number)
- **Body**: `UpdateGenreDto`
- **Yanıt**: Güncellenmiş tür
- **Yetkilendirme**: `JwtAuthGuard` + `RolesGuard` + `@Roles('Yönetici')`

#### `DELETE /genres/:id`
- **Açıklama**: Tür siler
- **Parametre**: `id` (number)
- **Yanıt**: Silinen tür
- **Yetkilendirme**: `JwtAuthGuard` + `RolesGuard` + `@Roles('Yönetici')`

## Kullanım Örnekleri

```typescript
// Tür listeleme
GET /genres

// Tür detay
GET /genres/1

// Tür oluşturma (Yönetici)
POST /genres
{
  "name": "Aksiyon"
}

// Tür güncelleme (Yönetici)
PATCH /genres/1
{
  "name": "Yeni Tür Adı"
}
```

