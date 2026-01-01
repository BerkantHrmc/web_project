# App.jsx

## Amaç

Ana uygulama component'idir. React Router yapılandırmasını ve route tanımlarını içerir.

## Temel Bileşenler

### `App` Fonksiyonu

### Yapılandırma

- **AuthProvider**: Tüm uygulamayı sarmalar, authentication context sağlar
- **Router**: BrowserRouter ile client-side routing
- **Routes**: Route tanımları

### Route'lar

#### `/login`
- **Component**: `Login`
- **Açıklama**: Kullanıcı giriş sayfası
- **Koruma**: Yok (public)

#### `/register`
- **Component**: `Register`
- **Açıklama**: Kullanıcı kayıt sayfası
- **Koruma**: Yok (public)

#### `/profiles`
- **Component**: `Layout` > `Profiles`
- **Açıklama**: Profil yönetimi sayfası
- **Koruma**: `ProtectedRoute` (giriş gerekli)

#### `/films`
- **Component**: `Layout` > `Films`
- **Açıklama**: Film yönetimi sayfası
- **Koruma**: `ProtectedRoute` (giriş gerekli)

#### `/genres`
- **Component**: `Layout` > `Genres`
- **Açıklama**: Tür yönetimi sayfası (sadece admin)
- **Koruma**: `ProtectedRoute` (giriş gerekli)

#### `/`
- **Açıklama**: Root path, `/profiles`'e yönlendirir
- **Component**: `Navigate` (redirect)

## Layout Yapısı

Tüm korumalı route'lar `Layout` component'i ile sarmalanır:
- Navigation bar
- Kullanıcı bilgileri
- Çıkış butonu

## Kullanım

```jsx
<AuthProvider>
  <Router>
    <Routes>
      {/* Route tanımları */}
    </Routes>
  </Router>
</AuthProvider>
```

