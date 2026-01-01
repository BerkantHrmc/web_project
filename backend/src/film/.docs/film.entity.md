# film.entity.ts

## Amaç

Film entity'sini tanımlar. Veritabanı tablosu yapısını ve ilişkilerini belirler.

## Temel Bileşenler

### `Film` Entity

- `@Entity()`: TypeORM entity decorator'ı

### Alanlar

#### `id: number`
- **Tip**: Primary key, auto-generated
- **Decorator**: `@PrimaryGeneratedColumn()`

#### `title: string`
- **Tip**: Film başlığı
- **Decorator**: `@Column()`
- **Zorunlu**: Evet

#### `description?: string | null`
- **Tip**: Film açıklaması
- **Decorator**: `@Column({ type: 'text', nullable: true })`
- **Zorunlu**: Hayır (opsiyonel)

#### `year?: number | null`
- **Tip**: Yayın yılı
- **Decorator**: `@Column({ type: 'int', nullable: true })`
- **Zorunlu**: Hayır (opsiyonel)

#### `posterUrl?: string | null`
- **Tip**: Poster görsel URL'i
- **Decorator**: `@Column({ type: 'text', nullable: true })`
- **Zorunlu**: Hayır (opsiyonel)

#### `genres: Genre[]`
- **Tip**: Film türleri (ilişki)
- **Decorator**: `@ManyToMany(() => Genre, (genre) => genre.films, { cascade: false })`
- **Join Table**: `@JoinTable()` - Film tarafı join table'ı yönetir
- **Cascade**: `false` - Genre silindiğinde film silinmez

#### `createdAt: Date`
- **Tip**: Oluşturulma tarihi
- **Decorator**: `@CreateDateColumn()`
- **Otomatik**: TypeORM otomatik olarak set eder

#### `updatedAt: Date`
- **Tip**: Güncellenme tarihi
- **Decorator**: `@UpdateDateColumn()`
- **Otomatik**: TypeORM otomatik olarak set eder

## İlişkiler

### Film ↔ Genre (Many-to-Many)

- Bir film birden fazla türe sahip olabilir
- Bir tür birden fazla filmde kullanılabilir
- Join table otomatik olarak oluşturulur

## Veritabanı Tablosu

Tablo adı: `film`
- `id` (INTEGER PRIMARY KEY)
- `title` (TEXT)
- `description` (TEXT, nullable)
- `year` (INTEGER, nullable)
- `posterUrl` (TEXT, nullable)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

Join table: `film_genres_genre`
- `filmId` (INTEGER)
- `genreId` (INTEGER)

