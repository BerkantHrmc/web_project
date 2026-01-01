# create-genre.dto.ts

## Amaç

Yeni tür oluşturma için gelen verilerin doğrulanmasını sağlar.

## Temel Bileşenler

### `CreateGenreDto` Sınıfı

### Alanlar

#### `name: string`
- **Açıklama**: Tür adı
- **Validasyon**: `@IsString()` - String olmalı
- **Zorunlu**: Evet
- **Benzersizlik**: Aynı isimde tür olamaz (veritabanı ve servis kontrolü)

## Kullanım

```typescript
POST /genres
{
  "name": "Aksiyon"
}
```

## Validasyon Kuralları

- `name` zorunludur ve string olmalı
- Aynı isimde tür varsa `400 Bad Request` döner

