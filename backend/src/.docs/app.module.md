# app.module.ts

## Amaç

NestJS uygulamasının ana modülüdür. Tüm diğer modüllerin, controller'ların, servislerin ve veritabanı yapılandırmasının bir araya getirildiği root modüldür.

## Temel Bileşenler

### Imports

1. **TypeOrmModule.forRoot()**: 
   - SQLite veritabanı bağlantısı
   - Entity'lerin tanımlandığı yer: `Profile`, `ProfileType`, `Film`, `Genre`
   - `synchronize: true`: Development modunda otomatik şema senkronizasyonu

2. **TypeOrmModule.forFeature([Profile])**: 
   - Profile entity'si için repository injection

3. **ServeStaticModule**: 
   - `/uploads` endpoint'i üzerinden statik dosya servisi
   - Kullanıcı fotoğraflarının sunulması için

4. **Alt Modüller**:
   - `ProfileTypeModule`: Profil türleri yönetimi
   - `AuthModule`: Kimlik doğrulama
   - `FilmModule`: Film yönetimi
   - `GenreModule`: Tür yönetimi

### Controllers

- `AppController`: Ana controller
- `ProfileController`: Profil yönetimi controller'ı

### Providers

- `AppService`: Ana servis
- `ProfileService`: Profil yönetimi servisi

## Veritabanı Yapılandırması

- **Tip**: SQLite
- **Dosya**: `db.sqlite` (proje kök dizininde)
- **Synchronize**: Development modunda aktif (production'da kapatılmalı)

## Statik Dosya Servisi

- **Klasör**: `./uploads`
- **URL**: `http://localhost:3000/uploads/{filename}`
- **Kullanım**: Kullanıcı profil fotoğrafları

