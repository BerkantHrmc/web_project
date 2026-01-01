# main.ts

## Amaç

NestJS uygulamasının giriş noktasıdır. Uygulama başlatma, middleware yapılandırması ve sunucu dinleme işlemlerini yönetir.

## Temel Bileşenler

### `bootstrap()` Fonksiyonu

Uygulama başlatma fonksiyonu. Şu işlemleri gerçekleştirir:

1. **NestFactory ile uygulama oluşturma**: `AppModule` kullanılarak uygulama instance'ı oluşturulur
2. **Global ValidationPipe yapılandırması**: 
   - `whitelist: true`: DTO'da tanımlı olmayan alanları otomatik olarak filtreler
   - `transform: true`: Gelen verileri otomatik olarak DTO tipine dönüştürür
3. **CORS yapılandırması**: 
   - Frontend (http://localhost:5173) ile iletişim için CORS etkinleştirilir
   - `credentials: true`: Cookie ve Authorization header'larının gönderilmesine izin verir
4. **Sunucu dinleme**: Port 3000'de (veya `process.env.PORT`) sunucu başlatılır

## Önemli Özellikler

- **ValidationPipe**: Tüm gelen istekler otomatik olarak doğrulanır
- **CORS**: Frontend-backend iletişimi için gerekli yapılandırma
- **Port yapılandırması**: Environment variable veya varsayılan port (3000) kullanılır

## Kullanım

```bash
npm run start:dev  # Development modunda çalıştırma
```

