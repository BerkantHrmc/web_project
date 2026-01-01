# jwt-auth.guard.ts

## Amaç

JWT token doğrulama guard'ıdır. Endpoint'leri korumak için kullanılır.

## Temel Bileşenler

### `JwtAuthGuard` Sınıfı

- `AuthGuard('jwt')`: Passport JWT guard'ından türetilmiş
- `@Injectable()`: Dependency injection için

## Kullanım

Controller metodlarına `@UseGuards(JwtAuthGuard)` decorator'ı eklenerek endpoint korunur.

```typescript
@UseGuards(JwtAuthGuard)
@Get('me')
me(@Req() req: AuthedRequest) {
  return this.authService.me(req.user);
}
```

## İşleyiş

1. Request'ten Authorization header'ı okunur
2. JWT token çıkarılır
3. `JwtStrategy` ile token doğrulanır
4. Doğrulama başarılıysa `request.user` set edilir
5. Doğrulama başarısızsa `401 Unauthorized` döner

## Örnek

```typescript
// Korumalı endpoint
@UseGuards(JwtAuthGuard)
@Get('protected')
getProtected(@Req() req) {
  const user = req.user; // JwtStrategy'den gelen kullanıcı
  return { message: 'Protected data', user };
}
```

