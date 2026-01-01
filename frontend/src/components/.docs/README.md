# Components Klasörü

## Amaç

React component'lerini içerir. Uygulamanın tüm UI bileşenleri bu klasördedir.

## Dosyalar

- **Login.jsx**: Kullanıcı giriş formu
- **Register.jsx**: Kullanıcı kayıt formu
- **Layout.jsx**: Ana layout component'i (navigation bar)
- **ProtectedRoute.jsx**: Route koruma component'i
- **Profiles.jsx**: Profil yönetimi sayfası
- **Films.jsx**: Film yönetimi sayfası
- **Genres.jsx**: Tür yönetimi sayfası (sadece admin)

## Özellikler

- Form validasyonu
- API entegrasyonu (Axios)
- Rol bazlı UI kontrolü
- Modal dialog'lar
- CRUD işlemleri

## Ortak Özellikler

- **useAuth**: Authentication context kullanımı
- **Axios**: HTTP istekleri
- **useState/useEffect**: State yönetimi
- **React Router**: Navigation

