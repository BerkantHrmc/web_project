# Films.jsx

## Amaç

Film yönetimi sayfası component'idir. CRUD işlemleri ve film-tür ilişkisi yönetimi.

## Temel Bileşenler

### State

- `films`: Film listesi
- `genres`: Tür listesi
- `form`: Form verileri (title, description, year, posterUrl, genreIds)
- `editingId`: Düzenlenen film ID'si
- `errorMsg`: Hata mesajı
- `isModalOpen`: Modal açık/kapalı durumu

### Hooks

- `useAuth`: Authentication context (isAdmin)
- `useEffect`: Film ve türleri yükleme

### Fonksiyonlar

#### `fetchFilms()`
- **Açıklama**: Tüm filmleri API'den yükler

#### `fetchGenres()`
- **Açıklama**: Tüm türleri API'den yükler

#### `openCreate()`
- **Açıklama**: Yeni film oluşturma modal'ını açar

#### `openEdit(film)`
- **Açıklama**: Film düzenleme modal'ını açar

#### `handleSubmit(e)`
- **Açıklama**: Form gönderimi
- **İşlemler**:
  1. `genreIds` number array'e çevrilir
  2. POST veya PATCH isteği gönderilir
  3. Başarılıysa liste yenilenir

#### `handleDelete(id)`
- **Açıklama**: Film silme
- **Yetkilendirme**: Sadece admin

### Özellikler

- **Rol Bazlı UI**: 
  - Admin: Tüm butonlar görünür (Ekle, Düzenle, Sil)
  - Diğerleri: Sadece görüntüleme
- **Tür Seçimi**: 
  - Checkbox listesi ile çoklu seçim
  - Film oluşturma/güncellemede türler seçilebilir

## Kullanım

```jsx
<Films />
```

## Yetkilendirme

- **Listeleme**: Tüm kullanıcılar
- **Oluşturma**: Sadece admin
- **Düzenleme**: Sadece admin
- **Silme**: Sadece admin

