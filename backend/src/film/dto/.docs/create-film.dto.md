# create-film.dto.ts

## Amaç

Yeni film oluşturma için gelen verilerin doğrulanmasını sağlar.

## Temel Bileşenler

### `CreateFilmDto` Sınıfı

### Alanlar

#### `title: string`
- **Açıklama**: Film başlığı
- **Validasyon**: `@IsString()` - String olmalı
- **Zorunlu**: Evet

#### `description?: string`
- **Açıklama**: Film açıklaması
- **Validasyon**: `@IsOptional()` + `@IsString()` - Opsiyonel string
- **Zorunlu**: Hayır

#### `year?: number`
- **Açıklama**: Yayın yılı
- **Validasyon**: 
  - `@IsOptional()` - Opsiyonel
  - `@IsInt()` - Integer olmalı
  - `@Min(1888)` - En az 1888
  - `@Max(2100)` - En fazla 2100
- **Zorunlu**: Hayır

#### `posterUrl?: string`
- **Açıklama**: Poster görsel URL'i
- **Validasyon**: 
  - `@IsOptional()` - Opsiyonel
  - `@IsUrl({ require_tld: false })` - Geçerli URL formatı
- **Zorunlu**: Hayır

#### `genreIds?: number[]`
- **Açıklama**: Film türü ID'leri
- **Validasyon**: 
  - `@IsOptional()` - Opsiyonel
  - `@IsArray()` - Array olmalı
  - `@Type(() => Number)` - Her eleman number'a dönüştürülür
  - `@IsInt({ each: true })` - Her eleman integer olmalı
- **Zorunlu**: Hayır
- **Kullanım**: Film-tür ilişkisi için

## Kullanım

```typescript
POST /films
{
  "title": "Film Adı",
  "description": "Açıklama",
  "year": 2024,
  "posterUrl": "https://example.com/poster.jpg",
  "genreIds": [1, 2, 3]
}
```

## Validasyon Kuralları

- `title` zorunludur
- `year` 1888-2100 arası olmalı
- `posterUrl` geçerli URL formatı olmalı
- `genreIds` number array olmalı

