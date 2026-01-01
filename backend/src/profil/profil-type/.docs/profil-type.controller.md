# profil-type.controller.ts

## Amaç

Profil türü yönetimi için HTTP endpoint'lerini tanımlar.

## Temel Bileşenler

### `ProfileTypeController` Sınıfı

- `@Controller('profileTypes')`: `/profileTypes` path'i için controller

### Endpoints

#### `GET /profileTypes`
- **Açıklama**: Tüm profil türlerini listeler
- **Yanıt**: Profil türü array'i
- **Yetkilendirme**: Gerekmez (public)
- **Kullanım**: Frontend'de rol seçimi için

## Kullanım Örnekleri

```typescript
// Profil türü listeleme
GET /profileTypes

// Yanıt örneği:
[
  { id: 1, name: "Yönetici" },
  { id: 2, name: "Standart Kullanıcı" },
  { id: 3, name: "Misafir" }
]
```

