# roles.decorator.ts

## Amaç

Rol bazlı yetkilendirme için custom decorator sağlar. Controller metodlarına hangi rollerin erişebileceğini belirtmek için kullanılır.

## Temel Bileşenler

### `Roles` Decorator Fonksiyonu

- `@SetMetadata(ROLES_KEY, roles)`: NestJS metadata sistemi kullanılarak rol bilgisi saklanır
- **ROLES_KEY**: `'roles'` - Metadata anahtarı

## Kullanım

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Yönetici')
@Post('create')
create(@Body() dto: CreateDto) {
  // Sadece Yönetici rolü erişebilir
}
```

## Çoklu Rol Desteği

```typescript
@Roles('Yönetici', 'Moderatör')
@Get('admin')
getAdmin() {
  // Yönetici veya Moderatör erişebilir
}
```

## İşleyiş

1. `@Roles()` decorator'ı metadata'ya rol bilgisini ekler
2. `RolesGuard` bu metadata'yı okur
3. Kullanıcının rolü ile karşılaştırır
4. Eşleşme varsa erişim izni verilir

## Örnek

```typescript
@Controller('films')
export class FilmController {
  @Get()
  findAll() {
    // Herkes erişebilir
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Yönetici')
  @Post()
  create(@Body() dto: CreateFilmDto) {
    // Sadece Yönetici erişebilir
  }
}
```

