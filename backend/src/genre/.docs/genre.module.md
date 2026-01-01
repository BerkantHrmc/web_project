# genre.module.ts

## Amaç

Genre modülünün yapılandırmasını içerir.

## Temel Bileşenler

### `GenreModule` Sınıfı

- `@Module()`: NestJS modül decorator'ı

### Imports

- **TypeOrmModule.forFeature([Genre])**:
  - Genre entity'si için repository injection

### Controllers

- `GenreController`: Genre endpoint'leri

### Providers

- `GenreService`: Genre iş mantığı

### Exports

- `TypeOrmModule`: Film modülü tarafından kullanılabilir (film-genre ilişkisi için)

