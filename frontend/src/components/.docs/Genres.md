# Genres.jsx

## Amaç

Tür (genre) yönetimi sayfası component'idir. CRUD işlemleri (sadece admin).

## Temel Bileşenler

### State

- `genres`: Tür listesi
- `form`: Form verileri (name)
- `editingId`: Düzenlenen tür ID'si
- `errorMsg`: Hata mesajı
- `isModalOpen`: Modal açık/kapalı durumu

### Hooks

- `useAuth`: Authentication context (isAdmin)
- `useEffect`: Türleri yükleme

### Admin Kontrolü

- **Erişim Kontrolü**: 
  - Admin değilse `/profiles`'e yönlendirilir
  - `Navigate` component'i ile otomatik yönlendirme

### Fonksiyonlar

#### `fetchGenres()`
- **Açıklama**: Tüm türleri API'den yükler

#### `openCreate()`
- **Açıklama**: Yeni tür oluşturma modal'ını açar

#### `openEdit(genre)`
- **Açıklama**: Tür düzenleme modal'ını açar

#### `handleSubmit(e)`
- **Açıklama**: Form gönderimi
- **İşlemler**:
  1. POST veya PATCH isteği gönderilir
  2. Başarılıysa liste yenilenir

#### `handleDelete(id)`
- **Açıklama**: Tür silme
- **Onay**: Window confirm dialog'u

## Kullanım

```jsx
<Genres />
```

## Yetkilendirme

- **Erişim**: Sadece admin
- **Tüm İşlemler**: Sadece admin (CRUD)

## Özellikler

- Admin kontrolü (otomatik yönlendirme)
- Basit form (sadece name alanı)
- Silme onayı (confirm dialog)

