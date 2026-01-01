# AuthContext.jsx

## Amaç

Authentication için global state yönetimi sağlar. Login, register, logout işlemlerini ve kullanıcı bilgilerini yönetir.

## Temel Bileşenler

### `AuthContext`

- React Context instance'ı
- Authentication state ve fonksiyonları içerir

### `useAuth()` Hook

- **Açıklama**: AuthContext'e erişim sağlar
- **Kullanım**: Component'lerde authentication bilgilerine erişmek için
- **Hata**: Context dışında kullanılırsa hata fırlatır

### `AuthProvider` Component

- **Props**: `children` - Uygulama component'leri
- **Amaç**: Tüm uygulamayı sarmalar ve authentication state sağlar

### State

- `token`: JWT token (localStorage'dan yüklenir)
- `user`: Kullanıcı bilgileri (Profile objesi)
- `loading`: Yükleme durumu

### Fonksiyonlar

#### `login(username, password)`
- **Açıklama**: Kullanıcı girişi
- **İşlemler**:
  1. API'ye login isteği gönderilir
  2. Token alınır ve localStorage'a kaydedilir
  3. Axios header'ına token eklenir
  4. Kullanıcı bilgileri yüklenir
- **Yanıt**: `{ success: boolean, message?: string }`

#### `register(username, email, password, confirmPassword)`
- **Açıklama**: Kullanıcı kaydı
- **İşlemler**:
  1. API'ye register isteği gönderilir
  2. Başarılıysa kayıt tamamlanır
- **Yanıt**: `{ success: boolean, message?: string }`

#### `logout()`
- **Açıklama**: Kullanıcı çıkışı
- **İşlemler**:
  1. Token temizlenir
  2. User state temizlenir
  3. localStorage'dan token silinir
  4. Axios header'ından token kaldırılır

#### `fetchUser()`
- **Açıklama**: Kullanıcı bilgilerini API'den yükler
- **İşlemler**:
  1. `/auth/me` endpoint'ine istek gönderilir
  2. Kullanıcı bilgileri state'e set edilir
  3. Hata durumunda logout yapılır

#### `isAdmin()`
- **Açıklama**: Kullanıcının admin olup olmadığını kontrol eder
- **Yanıt**: `boolean` - `user.profileType.name === "Yönetici"`

### useEffect Hook'ları

1. **Token Initialization**: 
   - Sayfa yüklendiğinde localStorage'dan token okunur
   - Axios header'ına eklenir

2. **Token Change**: 
   - Token değiştiğinde kullanıcı bilgileri yüklenir
   - Token yoksa loading false yapılır

## Kullanım

```jsx
// Provider ile sarmalama
<AuthProvider>
  <App />
</AuthProvider>

// Component'te kullanım
const { user, login, logout, isAdmin } = useAuth();
```

## Özellikler

- Token localStorage'da saklanır
- Axios header'ları otomatik yapılandırılır
- Kullanıcı bilgileri otomatik yüklenir
- Admin kontrolü fonksiyonu

