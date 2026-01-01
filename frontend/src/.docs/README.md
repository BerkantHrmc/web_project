# Frontend Source Klasörü

Bu klasör, React tabanlı frontend uygulamasının ana kaynak kodlarını içerir.

## Genel Amaç

Frontend uygulaması, film yönetim sistemi için kullanıcı arayüzü sağlar. React, React Router ve Axios kullanılarak geliştirilmiştir.

## Klasör Yapısı

- **App.jsx**: Ana uygulama component'i ve routing
- **main.jsx**: React uygulamasının giriş noktası
- **index.css**: Global CSS stilleri
- **components/**: React component'leri
- **contexts/**: React Context API (AuthContext)
- **assets/**: Statik dosyalar (görseller vb.)

## Teknolojiler

- **React**: UI kütüphanesi
- **React Router**: Sayfa yönlendirme
- **Axios**: HTTP istekleri
- **Vite**: Build tool ve dev server
- **Context API**: Global state yönetimi

## Özellikler

- Kullanıcı kimlik doğrulama (login/register)
- Film yönetimi (CRUD)
- Tür (genre) yönetimi (sadece admin)
- Profil yönetimi
- Rol bazlı yetkilendirme
- Responsive tasarım

