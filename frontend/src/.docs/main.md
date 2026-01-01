# main.jsx

## Amaç

React uygulamasının giriş noktasıdır. React DOM'a uygulamayı render eder.

## Temel Bileşenler

### ReactDOM.createRoot()

- **Target**: `#root` element'i (index.html'de tanımlı)
- **Mode**: `React.StrictMode` - Development modunda ek kontroller

### Import'lar

- **React**: React kütüphanesi
- **ReactDOM**: DOM render işlemleri
- **App**: Ana uygulama component'i
- **CSS**: Global stiller ve Flowbite CSS

### CSS Import'ları

- `flowbite/dist/flowbite.css`: Flowbite UI kütüphanesi stilleri
- `./index.css`: Uygulama özel stilleri

## Kullanım

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Özellikler

- **StrictMode**: Development modunda ek uyarılar ve kontroller
- **Hot Module Replacement**: Vite ile otomatik yenileme
- **CSS Support**: Global ve kütüphane stilleri

