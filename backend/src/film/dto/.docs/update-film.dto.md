# update-film.dto.ts

## Amaç

Mevcut filmi güncelleme için gelen verilerin doğrulanmasını sağlar.

## Temel Bileşenler

### `UpdateFilmDto` Sınıfı

Tüm alanlar opsiyoneldir. Sadece gönderilen alanlar güncellenir.

### Alanlar

#### `title?: string`
- **Açıklama**: Film başlığı
- **Validasyon**: `@IsOptional()` + `@IsString()` - Opsiyonel string
- **Zorunlu**: Hayır

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
- **Not**: Gönderilirse tüm türler değiştirilir

## Kullanım

```typescript
PATCH /films/1
{
  "title": "Yeni Film Adı",
  "year": 2025,
  "genreIds": [1, 2]
}
```

## Validasyon Kuralları

- Tüm alanlar opsiyoneldir
- Gönderilen alanlar `CreateFilmDto` ile aynı kurallara tabidir
- `genreIds` gönderilirse tüm mevcut türler değiştirilir

