# app.controller.ts

## Amaç

Uygulamanın ana controller'ıdır. Basit bir test endpoint'i sağlar.

## Temel Bileşenler

### `AppController` Sınıfı

- `@Controller()`: Root path (`/`) için controller

### Endpoints

#### `GET /`
- **Açıklama**: Basit bir "Hello World" mesajı döndürür
- **Yanıt**: `string` - "Hello World!"
- **Kullanım**: API'nin çalışıp çalışmadığını test etmek için

### Bağımlılıklar

- `AppService`: `getHello()` metodunu çağırır

## Kullanım

```bash
curl http://localhost:3000/
# Yanıt: "Hello World!"
```

