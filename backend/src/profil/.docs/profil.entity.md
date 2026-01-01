# profil.entity.ts

## Amaç

Profil entity'sini tanımlar. Veritabanı tablosu yapısını ve ilişkilerini belirler.

## Temel Bileşenler

### `Profile` Entity

- `@Entity()`: TypeORM entity decorator'ı

### Alanlar

#### `id: number`
- **Tip**: Primary key, auto-generated
- **Decorator**: `@PrimaryGeneratedColumn()`

#### `username: string`
- **Tip**: Kullanıcı adı
- **Decorator**: `@Column()`
- **Zorunlu**: Evet
- **Benzersizlik**: Kullanıcı adı benzersiz olmalı

#### `password: string`
- **Tip**: Hashlenmiş şifre
- **Decorator**: `@Column()`
- **Zorunlu**: Evet
- **Güvenlik**: bcrypt ile hashlenmiş

#### `email: string`
- **Tip**: E-posta adresi
- **Decorator**: `@Column()`
- **Zorunlu**: Evet
- **Benzersizlik**: Email benzersiz olmalı

#### `photo: string`
- **Tip**: Profil fotoğrafı URL'i
- **Decorator**: `@Column()`
- **Zorunlu**: Evet
- **Format**: `http://localhost:3000/uploads/{filename}`

#### `profileType: ProfileType`
- **Tip**: Profil türü (rol) ilişkisi
- **Decorator**: `@ManyToOne(() => ProfileType, { eager: false })`
- **Join Column**: `@JoinColumn({ name: 'profileTypeId' })`
- **Eager Loading**: `false` - İstek üzerine yüklenir

#### `profileTypeId: number`
- **Tip**: Profil türü ID'si (foreign key)
- **Decorator**: `@Column()`
- **Zorunlu**: Evet

## İlişkiler

### Profile ↔ ProfileType (Many-to-One)

- Her profil bir profil türüne (rol) sahiptir
- Profil türleri: Yönetici, Standart Kullanıcı, Misafir
- `profileTypeId` foreign key olarak kullanılır

## Veritabanı Tablosu

Tablo adı: `profile`
- `id` (INTEGER PRIMARY KEY)
- `username` (TEXT)
- `password` (TEXT)
- `email` (TEXT)
- `photo` (TEXT)
- `profileTypeId` (INTEGER, FOREIGN KEY)

