# roles.guard.ts

## Amaç

Rol bazlı yetkilendirme guard'ıdır. `@Roles()` decorator'ı ile belirtilen rollerin kontrolünü yapar.

## Temel Bileşenler

### `RolesGuard` Sınıfı

- `CanActivate`: NestJS guard interface'ini implement eder
- `Reflector`: Metadata okumak için kullanılır

### Metodlar

#### `canActivate(context: ExecutionContext): boolean`
- **Açıklama**: Endpoint erişim kontrolü yapar
- **İşlemler**:
  1. `@Roles()` decorator'ından rol bilgisini okur
  2. Rol belirtilmemişse erişim izni verir
  3. Request'ten kullanıcı bilgisini alır
  4. Kullanıcının rolünü kontrol eder
  5. Rol eşleşirse `true`, eşleşmezse `ForbiddenException` fırlatır

## Kullanım

`JwtAuthGuard` ile birlikte kullanılmalıdır çünkü kullanıcı bilgisine ihtiyaç duyar.

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Yönetici')
@Post('create')
create(@Body() dto: CreateDto) {
  // ...
}
```

## Hata Durumları

- **Rol bilgisi yok**: `ForbiddenException('Rol bilgisi yok')`
- **Yetkisiz erişim**: `ForbiddenException('Yetkisiz')`

## İşleyiş Akışı

1. `JwtAuthGuard` kullanıcıyı doğrular ve `request.user`'a ekler
2. `RolesGuard` kullanıcının rolünü kontrol eder
3. `@Roles()` ile belirtilen rollerle karşılaştırır
4. Eşleşme varsa erişim izni verilir

