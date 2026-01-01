# jwt.strategy.ts

## Amaç

JWT token doğrulama stratejisini tanımlar. Passport JWT stratejisini kullanarak token'ları doğrular ve kullanıcı bilgilerini çıkarır.

## Temel Bileşenler

### `JwtStrategy` Sınıfı

- `PassportStrategy(Strategy)`: Passport JWT stratejisinden türetilmiş

### Yapılandırma

- **jwtFromRequest**: `ExtractJwt.fromAuthHeaderAsBearerToken()` - Authorization header'dan token çıkarır
- **ignoreExpiration**: `false` - Token süresi kontrol edilir
- **secretOrKey**: `process.env.JWT_SECRET` veya `'dev-secret-change-me'`

### Metodlar

#### `validate(payload: JwtPayload)`
- **Açıklama**: Token doğrulandıktan sonra çağrılır
- **İşlemler**:
  1. Token payload'ından kullanıcı ID'sini alır (`payload.sub`)
  2. Veritabanından kullanıcıyı bulur (profileType ilişkisiyle)
  3. Kullanıcı yoksa `UnauthorizedException` fırlatır
  4. Kullanıcıyı döndürür (request.user olarak erişilebilir)

### JwtPayload Tipi

```typescript
{
  sub: number; // Kullanıcı ID'si
}
```

## Kullanım

Bu strateji `JwtAuthGuard` ile birlikte kullanılır. Guard, bu stratejiyi otomatik olarak çağırır ve `request.user`'a kullanıcı bilgisini ekler.

## Güvenlik

- Token süresi kontrol edilir
- Geçersiz token'lar için `UnauthorizedException` fırlatılır
- Kullanıcı bulunamazsa erişim reddedilir

