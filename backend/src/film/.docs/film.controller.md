# film.controller.ts

## Amaç

Film yönetimi için HTTP endpoint'lerini tanımlar.

## Temel Bileşenler

### `FilmController` Sınıfı

- `@Controller('films')`: `/films` path'i için controller

### Endpoints

#### `GET /films`
- **Açıklama**: Tüm filmleri listeler
- **Yanıt**: Film array'i (genres ilişkisiyle)
- **Sıralama**: Oluşturulma tarihine göre azalan (DESC)
- **Yetkilendirme**: Gerekmez (public)

#### `GET /films/:id`
- **Açıklama**: Belirli bir filmin detaylarını getirir
- **Parametre**: `id` (number)
- **Yanıt**: Film objesi (genres ilişkisiyle)
- **Hata**: Film bulunamazsa `404 Not Found`
- **Yetkilendirme**: Gerekmez (public)

#### `POST /films`
- **Açıklama**: Yeni film oluşturur
- **Body**: `CreateFilmDto`
- **Yanıt**: Oluşturulan film
- **Yetkilendirme**: `JwtAuthGuard` + `RolesGuard` + `@Roles('Yönetici')`

#### `PATCH /films/:id`
- **Açıklama**: Mevcut filmi günceller
- **Parametre**: `id` (number)
- **Body**: `UpdateFilmDto`
- **Yanıt**: Güncellenmiş film
- **Yetkilendirme**: `JwtAuthGuard` + `RolesGuard` + `@Roles('Yönetici')`

#### `DELETE /films/:id`
- **Açıklama**: Film siler
- **Parametre**: `id` (number)
- **Yanıt**: Silinen film
- **Yetkilendirme**: `JwtAuthGuard` + `RolesGuard` + `@Roles('Yönetici')`

## Kullanım Örnekleri

```typescript
// Film listeleme
GET /films

// Film detay
GET /films/1

// Film oluşturma (Yönetici)
POST /films
{
  "title": "Film Adı",
  "description": "Açıklama",
  "year": 2024,
  "posterUrl": "https://example.com/poster.jpg",
  "genreIds": [1, 2, 3]
}

// Film güncelleme (Yönetici)
PATCH /films/1
{
  "title": "Yeni Film Adı",
  "genreIds": [1, 2]
}
```

