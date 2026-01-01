# Profiles.jsx

## Amaç

Profil yönetimi sayfası component'idir. CRUD işlemleri ve profil fotoğrafı yükleme.

## Temel Bileşenler

### State

- `profiles`: Profil listesi
- `profileTypes`: Profil türleri (roller)
- `form`: Form verileri (username, email, password, confirmPassword, profileTypeId, photo)
- `editingId`: Düzenlenen profil ID'si
- `errorMsg`: Hata mesajı
- `isModalOpen`: Modal açık/kapalı durumu

### Hooks

- `useAuth`: Authentication context (isAdmin, user)
- `useEffect`: Profil ve profil türlerini yükleme

### Fonksiyonlar

#### `fetchProfiles()`
- **Açıklama**: Tüm profilleri API'den yükler

#### `fetchProfileTypes()`
- **Açıklama**: Profil türlerini API'den yükler

#### `openCreate()`
- **Açıklama**: Yeni profil oluşturma modal'ını açar

#### `openEdit(profile)`
- **Açıklama**: Profil düzenleme modal'ını açar

#### `handleSubmit(e)`
- **Açıklama**: Form gönderimi
- **İşlemler**:
  1. FormData oluşturulur
  2. Fotoğraf varsa eklenir
  3. POST veya PATCH isteği gönderilir
  4. Başarılıysa liste yenilenir

#### `handleDelete(id)`
- **Açıklama**: Profil silme
- **Yetkilendirme**: Kendi profili veya admin

### Özellikler

- **Rol Bazlı UI**: 
  - Admin: Tüm butonlar görünür
  - Diğerleri: Sadece kendi profilini düzenleyebilir
- **Profil Türü Yönetimi**: 
  - Admin: Profil türünü değiştirebilir
  - Diğerleri: Profil türünü değiştiremez
- **Fotoğraf Yükleme**: Multer ile dosya yükleme

## Kullanım

```jsx
<Profiles />
```

## Yetkilendirme

- **Listeleme**: Tüm kullanıcılar
- **Oluşturma**: Sadece admin
- **Düzenleme**: Kendi profili veya admin
- **Silme**: Kendi profili veya admin

