# auth.service.ts

## Amaç

Kimlik doğrulama iş mantığını içerir. Kullanıcı kayıt, giriş ve token yönetimi işlemlerini gerçekleştirir.

## Temel Bileşenler

### `AuthService` Sınıfı

- `@Injectable()`: Dependency injection için

### Bağımlılıklar

- `ProfileRepository`: Kullanıcı veritabanı işlemleri
- `ProfileTypeRepository`: Rol/Profil tipi işlemleri
- `JwtService`: JWT token üretimi

### Metodlar

#### `register(dto: RegisterDto)`
- **Açıklama**: Yeni kullanıcı kaydı
- **İşlemler**:
  1. Şifre eşleşme kontrolü
  2. Kullanıcı adı/email benzersizlik kontrolü
  3. Varsayılan rol atama ("Standart Kullanıcı")
  4. Şifre hashleme (bcrypt)
  5. Kullanıcı kaydı
- **Yanıt**: Kayıtlı kullanıcı (şifre hariç)

#### `login(dto: LoginDto)`
- **Açıklama**: Kullanıcı girişi
- **İşlemler**:
  1. Kullanıcı adı ile kullanıcı bulma
  2. Şifre doğrulama (bcrypt veya plain text - backward compatibility)
  3. JWT token üretimi
- **Yanıt**: `{ access_token: string, user: Profile }`

#### `me(user: Profile)`
- **Açıklama**: Kullanıcı bilgilerini döndürür (şifre hariç)
- **Yanıt**: Kullanıcı bilgileri

### Private Metodlar

#### `sanitize(user: Profile)`
- **Açıklama**: Kullanıcı nesnesinden şifreyi çıkarır
- **Kullanım**: Güvenlik için şifrenin client'a gönderilmemesi

#### `verifyPassword(plain: string, stored: string)`
- **Açıklama**: Şifre doğrulama
- **Özellik**: Eski plain text şifreler için backward compatibility

## Güvenlik Özellikleri

- Şifreler bcrypt ile hashlenir (10 rounds)
- Şifreler asla client'a gönderilmez
- JWT token'lar kullanıcı ID'si içerir
- Kullanıcı adı ve email benzersizlik kontrolü

