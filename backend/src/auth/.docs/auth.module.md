# auth.module.ts

## Amaç

Auth modülünün yapılandırmasını içerir. JWT, Passport ve TypeORM yapılandırmalarını bir araya getirir.

## Temel Bileşenler

### `AuthModule` Sınıfı

- `@Module()`: NestJS modül decorator'ı

### Imports

1. **TypeOrmModule.forFeature([Profile, ProfileType])**:
   - Profile ve ProfileType entity'leri için repository injection

2. **PassportModule**:
   - Passport kimlik doğrulama stratejileri için

3. **JwtModule.register()**:
   - JWT yapılandırması
   - Secret: `process.env.JWT_SECRET` veya `'dev-secret-change-me'`
   - Token süresi: 7 gün

### Controllers

- `AuthController`: Auth endpoint'leri

### Providers

- `AuthService`: Auth iş mantığı
- `JwtStrategy`: JWT token doğrulama stratejisi

### Exports

- `JwtModule`: Diğer modüller tarafından kullanılabilir

## Yapılandırma

### JWT Secret

Production ortamında `JWT_SECRET` environment variable'ı kullanılmalıdır.

### Token Süresi

Varsayılan olarak 7 gün. `signOptions.expiresIn` ile değiştirilebilir.

