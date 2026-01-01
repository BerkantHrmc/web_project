# profil.service.ts

## Amaç

Profil yönetimi iş mantığını içerir. CRUD işlemleri, şifre hashleme ve rol yönetimi.

## Temel Bileşenler

### `ProfileService` Sınıfı

- `@Injectable()`: Dependency injection için

### Bağımlılıklar

- `ProfileRepository`: Profil veritabanı işlemleri

### Metodlar

#### `findAll()`
- **Açıklama**: Tüm profilleri getirir
- **İlişkiler**: `profileType` ilişkisi yüklenir
- **Yanıt**: Profil array'i

#### `findOne(id: number)`
- **Açıklama**: Belirli bir profili getirir
- **İlişkiler**: `profileType` ilişkisi yüklenir
- **Hata**: Profil bulunamazsa `NotFoundException`

#### `create(createProfileDto: CreateProfileDto, photoUrl: string)`
- **Açıklama**: Yeni profil oluşturur
- **İşlemler**:
  1. Şifre eşleşme kontrolü
  2. Şifre hashleme (bcrypt, 10 rounds)
  3. Profil entity'si oluşturulur
  4. Profil kaydedilir
- **Parametreler**:
  - `createProfileDto`: Profil bilgileri
  - `photoUrl`: Fotoğraf URL'i
- **Yanıt**: Oluşturulan profil (ilişkilerle)

#### `update(id: number, attrs: Record<string, unknown>, photoUrl?: string)`
- **Açıklama**: Mevcut profili günceller
- **İşlemler**:
  1. Profil bulunur
  2. Şifre eşleşme kontrolü (varsa)
  3. Şifre hashleme (varsa)
  4. `profileTypeId` parse edilir ve güncellenir
  5. Diğer alanlar güncellenir
  6. Profil kaydedilir
  7. `profileTypeId` direkt update query ile de güncellenir (kesinlik için)
- **Özellik**: `profileTypeId` özel olarak işlenir çünkü relation güncellemesi için kritiktir
- **Yanıt**: Güncellenmiş profil (ilişkilerle)

#### `remove(id: number)`
- **Açıklama**: Profil siler
- **İşlemler**:
  1. Profil bulunur
  2. Profil silinir

## Şifre Yönetimi

- Şifreler bcrypt ile hashlenir (10 rounds)
- Şifre eşleşme kontrolü yapılır
- Şifreler asla plain text olarak saklanmaz

## Rol Yönetimi

- `profileTypeId` string veya number olarak gelebilir
- Parse edilir ve number'a dönüştürülür
- Hem `save()` hem de `update()` query ile güncellenir (kesinlik için)

## Güvenlik

- Şifreler hashlenir
- Şifre eşleşme kontrolü yapılır
- Profil bilgileri güvenli şekilde işlenir

