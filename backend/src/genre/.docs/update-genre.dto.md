# update-genre.dto.ts

## Amaç

Mevcut türü güncelleme için gelen verilerin doğrulanmasını sağlar.

## Temel Bileşenler

### `UpdateGenreDto` Sınıfı

Tüm alanlar opsiyoneldir. Sadece gönderilen alanlar güncellenir.

### Alanlar

#### `name?: string`
- **Açıklama**: Tür adı
- **Validasyon**: `@IsOptional()` + `@IsString()` - Opsiyonel string
- **Zorunlu**: Hayır

## Kullanım

```typescript
PATCH /genres/1
{
  "name": "Yeni Tür Adı"
}
```

## Validasyon Kuralları

- `name` opsiyoneldir
- Gönderilirse string olmalı

