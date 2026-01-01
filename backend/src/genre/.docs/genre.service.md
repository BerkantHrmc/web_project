# genre.service.ts

## Amaç

Genre yönetimi iş mantığını içerir. CRUD işlemleri ve benzersizlik kontrolü.

## Temel Bileşenler

### `GenreService` Sınıfı

- `@Injectable()`: Dependency injection için

### Bağımlılıklar

- `GenreRepository`: Genre veritabanı işlemleri

### Metodlar

#### `findAll()`
- **Açıklama**: Tüm türleri getirir
- **Sıralama**: `name ASC` (alfabetik)

#### `findOne(id: number)`
- **Açıklama**: Belirli bir türü getirir
- **Hata**: Tür bulunamazsa `NotFoundException`

#### `create(dto: CreateGenreDto)`
- **Açıklama**: Yeni tür oluşturur
- **İşlemler**:
  1. Aynı isimde tür var mı kontrol edilir
  2. Varsa `BadRequestException` fırlatılır
  3. Yeni tür oluşturulur ve kaydedilir
- **Hata**: Aynı isimde tür varsa `BadRequestException('Bu tür zaten var')`

#### `update(id: number, dto: UpdateGenreDto)`
- **Açıklama**: Mevcut türü günceller
- **İşlemler**:
  1. Tür bulunur
  2. `name` güncellenirse yeni isim atanır
  3. Tür kaydedilir

#### `remove(id: number)`
- **Açıklama**: Tür siler
- **İşlemler**:
  1. Tür bulunur
  2. Tür silinir

## Benzersizlik Kontrolü

- `name` alanı unique'dir
- Aynı isimde iki tür oluşturulamaz
- Veritabanı seviyesinde unique constraint vardır

