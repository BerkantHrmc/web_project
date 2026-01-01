# Layout.jsx

## Amaç

Ana layout component'idir. Navigation bar ve sayfa yapısını sağlar.

## Temel Bileşenler

### Props

- `children`: Sayfa içeriği (React node)

### Hooks

- `useAuth`: Authentication context (user, logout, isAdmin)
- `useNavigate`: React Router navigation

### Fonksiyonlar

#### `handleLogout()`
- **Açıklama**: Kullanıcı çıkışı
- **İşlemler**:
  1. `logout()` fonksiyonu çağrılır
  2. `/login`'e yönlendirilir

### Navigation Link'leri

- **Film Yönetim Sistemi**: Logo/başlık (link to `/profiles`)
- **Profiller/Kullanıcılar**: 
  - Admin için "Profiller"
  - Diğerleri için "Kullanıcılar"
- **Filmler**: Film yönetimi sayfası
- **Türler**: Sadece admin için görünür

### Kullanıcı Bilgileri

- Kullanıcı adı ve rolü gösterilir
- Çıkış butonu

## Kullanım

```jsx
<Layout>
  <Profiles />
</Layout>
```

## Özellikler

- Responsive navigation bar
- Rol bazlı link gösterimi
- Kullanıcı bilgileri gösterimi
- Çıkış fonksiyonu

