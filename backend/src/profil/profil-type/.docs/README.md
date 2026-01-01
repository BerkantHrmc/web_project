# Profil Type Modülü

## Amaç

Profil türleri (roller) yönetimi için modül. Kullanıcı rollerini tanımlar ve yönetir.

## Klasör Yapısı

- **profil-type.controller.ts**: Profil türü endpoint'leri
- **profil-type.service.ts**: Profil türü iş mantığı ve seeding
- **profil-type.entity.ts**: Profil türü entity tanımı
- **profil-type.module.ts**: Profil türü modül yapılandırması

## Özellikler

- Profil türü listeleme
- Otomatik seeding (Yönetici, Standart Kullanıcı, Misafir)
- Profil türleri veritabanına otomatik eklenir (ilk çalıştırmada)

## Profil Türleri

1. **Yönetici**: Tüm yetkilere sahip
2. **Standart Kullanıcı**: Sınırlı yetkilere sahip
3. **Misafir**: En sınırlı yetkilere sahip

