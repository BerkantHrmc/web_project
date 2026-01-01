# profil-type.module.ts

## Amaç

Profil türü modülünün yapılandırmasını içerir.

## Temel Bileşenler

### `ProfileTypeModule` Sınıfı

- `@Module()`: NestJS modül decorator'ı

### Imports

- **TypeOrmModule.forFeature([ProfileType])**:
  - ProfileType entity'si için repository injection

### Controllers

- `ProfileTypeController`: Profil türü endpoint'leri

### Providers

- `ProfileTypeService`: Profil türü iş mantığı

### Exports

- `ProfileTypeService`: Diğer modüller tarafından kullanılabilir (Auth modülü gibi)

