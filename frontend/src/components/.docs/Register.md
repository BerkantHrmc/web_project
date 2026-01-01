# Register.jsx

## Amaç

Kullanıcı kayıt formu component'idir.

## Temel Bileşenler

### State

- `form`: `{ username, email, password, confirmPassword }` - Form verileri
- `error`: `string` - Hata mesajı

### Hooks

- `useAuth`: Authentication context
- `useNavigate`: React Router navigation

### Fonksiyonlar

#### `handleSubmit(e)`
- **Açıklama**: Form gönderimi
- **İşlemler**:
  1. Form submit'i engellenir
  2. Şifre eşleşme kontrolü (frontend'de)
  3. `register()` fonksiyonu çağrılır
  4. Başarılıysa `/login`'e yönlendirilir
  5. Başarısızsa hata mesajı gösterilir

### Form Alanları

- **username**: Kullanıcı adı input'u
- **email**: E-posta input'u (type="email")
- **password**: Şifre input'u (type="password")
- **confirmPassword**: Şifre tekrarı input'u
- **Submit Button**: Kayıt butonu
- **Login Link**: Giriş sayfasına link

## Kullanım

```jsx
<Register />
```

## Özellikler

- Form validasyonu (required, email formatı)
- Şifre eşleşme kontrolü
- Şifre gereksinimleri bilgisi (8 karakter, büyük/küçük harf, sayı, sembol)
- Hata mesajı gösterimi
- Başarılı kayıtta otomatik yönlendirme

