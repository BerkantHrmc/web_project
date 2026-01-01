# profil-type.service.ts

## Amaç

Profil türü yönetimi iş mantığını içerir. Otomatik seeding (veri ekleme) özelliği sağlar.

## Temel Bileşenler

### `ProfileTypeService` Sınıfı

- `@Injectable()`: Dependency injection için

### Bağımlılıklar

- `ProfileTypeRepository`: Profil türü veritabanı işlemleri

### Constructor

- `void this.seedProfileTypes()`: Servis oluşturulduğunda otomatik seeding başlatılır

### Metodlar

#### `seedProfileTypes()`
- **Açıklama**: Veritabanı boşsa varsayılan profil türlerini ekler
- **İşlemler**:
  1. Veritabanındaki profil türü sayısı kontrol edilir
  2. Eğer 0 ise, varsayılan türler eklenir:
     - "Yönetici"
     - "Standart Kullanıcı"
     - "Misafir"
  3. Console'a log yazılır
- **Çalışma Zamanı**: Servis ilk oluşturulduğunda (constructor'da)
- **Tekrar Çalışma**: Sadece veritabanı boşsa

#### `findAll()`
- **Açıklama**: Tüm profil türlerini getirir
- **Yanıt**: Profil türü array'i

## Seeding Özelliği

- İlk çalıştırmada otomatik olarak varsayılan roller eklenir
- Veritabanı zaten doluysa seeding yapılmaz
- Bu sayede manuel veri ekleme gerekmez

