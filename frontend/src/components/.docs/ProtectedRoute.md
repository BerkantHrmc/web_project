# ProtectedRoute.jsx

## Amaç

Route koruma component'idir. Sadece giriş yapmış kullanıcıların erişmesine izin verir.

## Temel Bileşenler

### Props

- `children`: Korunacak component (React node)

### Hooks

- `useAuth`: Authentication context (token, loading)

### İşleyiş

1. **Loading Kontrolü**: 
   - `loading === true` ise "Yükleniyor..." mesajı gösterilir
2. **Token Kontrolü**: 
   - `token` yoksa `/login`'e yönlendirilir
   - `token` varsa `children` render edilir

## Kullanım

```jsx
<ProtectedRoute>
  <Layout>
    <Profiles />
  </Layout>
</ProtectedRoute>
```

## Özellikler

- Loading state yönetimi
- Otomatik yönlendirme (login sayfasına)
- Token kontrolü

