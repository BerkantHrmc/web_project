# film.service.ts

## Amaç

Film yönetimi iş mantığını içerir. CRUD işlemleri ve film-tür ilişkisi yönetimi.

## Temel Bileşenler

### `FilmService` Sınıfı`

- `@Injectable()`: Dependency injection için

### Bağımlılıklar

- `FilmRepository`: Film veritabanı işlemleri
- `GenreRepository`: Tür veritabanı işlemleri

### Metodlar

#### `findAll()`
- **Açıklama**: Tüm filmleri getirir
- **İlişkiler**: `genres` ilişkisi yüklenir
- **Sıralama**: `createdAt DESC` (yeni önce)

#### `findOne(id: number)`
- **Açıklama**: Belirli bir filmi getirir
- **İlişkiler**: `genres` ilişkisi yüklenir
- **Hata**: Film bulunamazsa `NotFoundException`

#### `create(dto: CreateFilmDto)`
- **Açıklama**: Yeni film oluşturur
- **İşlemler**:
  1. Film entity'si oluşturulur
  2. `genreIds` varsa türler yüklenir ve ilişkilendirilir
  3. Film kaydedilir
- **Hata**: Geçersiz `genreIds` için `NotFoundException`

#### `update(id: number, dto: UpdateFilmDto)`
- **Açıklama**: Mevcut filmi günceller
- **İşlemler**:
  1. Film bulunur
  2. Güncellenecek alanlar atanır
  3. `genreIds` varsa türler güncellenir
  4. Film kaydedilir

#### `remove(id: number)`
- **Açıklama**: Film siler
- **İşlemler**:
  1. Film bulunur
  2. Film silinir

### Private Metodlar

#### `loadGenres(genreIds: number[])`
- **Açıklama**: Genre ID'lerinden genre entity'lerini yükler
- **İşlemler**:
  1. Tekrar eden ID'ler temizlenir
  2. Genre'ler veritabanından yüklenir
  3. Tüm ID'ler bulunamazsa `NotFoundException` fırlatılır
- **Yanıt**: Genre array'i

## İlişki Yönetimi

Film-Genre ilişkisi many-to-many'dir. `genreIds` array'i ile yönetilir:
- Film oluşturulurken/güncellenirken `genreIds` gönderilir
- Service bu ID'leri genre entity'lerine dönüştürür
- TypeORM otomatik olarak ilişkiyi yönetir

