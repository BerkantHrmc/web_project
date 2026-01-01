# film.module.ts

## Amaç

Film modülünün yapılandırmasını içerir.

## Temel Bileşenler

### `FilmModule` Sınıfı

- `@Module()`: NestJS modül decorator'ı

### Imports

- **TypeOrmModule.forFeature([Film, Genre])**:
  - Film ve Genre entity'leri için repository injection
  - Genre repository, film-tür ilişkisi için gerekli

### Controllers

- `FilmController`: Film endpoint'leri

### Providers

- `FilmService`: Film iş mantığı

## Bağımlılıklar

Film modülü Genre modülüne bağımlıdır çünkü film-tür ilişkisi yönetir. Genre entity'si import edilir.

