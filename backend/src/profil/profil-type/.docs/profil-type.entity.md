# profil-type.entity.ts

## Amaç

Profil türü (rol) entity'sini tanımlar.

## Temel Bileşenler

### `ProfileType` Entity

- `@Entity()`: TypeORM entity decorator'ı

### Alanlar

#### `id: number`
- **Tip**: Primary key, auto-generated
- **Decorator**: `@PrimaryGeneratedColumn()`

#### `name: string`
- **Tip**: Profil türü adı (rol adı)
- **Decorator**: `@Column({ unique: true })`
- **Zorunlu**: Evet
- **Benzersizlik**: Aynı isimde profil türü olamaz
- **Değerler**: "Yönetici", "Standart Kullanıcı", "Misafir"

## Veritabanı Tablosu

Tablo adı: `profile_type`
- `id` (INTEGER PRIMARY KEY)
- `name` (TEXT, UNIQUE)

