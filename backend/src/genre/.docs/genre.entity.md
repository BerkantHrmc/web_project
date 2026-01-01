# genre.entity.ts

## Amaç

Genre entity'sini tanımlar. Veritabanı tablosu yapısını ve ilişkilerini belirler.

## Temel Bileşenler

### `Genre` Entity

- `@Entity()`: TypeORM entity decorator'ı

### Alanlar

#### `id: number`
- **Tip**: Primary key, auto-generated
- **Decorator**: `@PrimaryGeneratedColumn()`

#### `name: string`
- **Tip**: Tür adı
- **Decorator**: `@Column({ unique: true })`
- **Zorunlu**: Evet
- **Benzersizlik**: Aynı isimde iki tür olamaz

#### `films: Film[]`
- **Tip**: Bu türe sahip filmler (ilişki)
- **Decorator**: `@ManyToMany(() => Film, (film) => film.genres)`
- **Not**: Film tarafı join table'ı yönettiği için burada sadece ilişki tanımı var

## İlişkiler

### Genre ↔ Film (Many-to-Many)

- Bir tür birden fazla filmde kullanılabilir
- Bir film birden fazla türe sahip olabilir
- Join table Film entity'sinde yönetilir

## Veritabanı Tablosu

Tablo adı: `genre`
- `id` (INTEGER PRIMARY KEY)
- `name` (TEXT, UNIQUE)

