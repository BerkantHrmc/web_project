# Login.jsx

## Amaç

Kullanıcı giriş formu component'idir.

## Temel Bileşenler

### State

- `form`: `{ username: string, password: string }` - Form verileri
- `error`: `string` - Hata mesajı

### Hooks

- `useAuth`: Authentication context
- `useNavigate`: React Router navigation

### Fonksiyonlar

#### `handleSubmit(e)`
- **Açıklama**: Form gönderimi
- **İşlemler**:
  1. Form submit'i engellenir
  2. `login()` fonksiyonu çağrılır
  3. Başarılıysa `/profiles`'e yönlendirilir
  4. Başarısızsa hata mesajı gösterilir

### Form Alanları

- **username**: Kullanıcı adı input'u
- **password**: Şifre input'u (type="password")
- **Submit Button**: Giriş butonu
- **Register Link**: Kayıt sayfasına link

## Kullanım

```jsx
<Login />
```

## Özellikler

- Form validasyonu (required)
- Hata mesajı gösterimi
- Başarılı girişte otomatik yönlendirme
- Kayıt sayfasına link

