# Proje Yapısı - ZIP İndirmek İçin

## Fotoğraf Dosyalarının Yerleşimi

Projeyi ZIP olarak indirdikten sonra aşağıdaki fotoğrafları belirtilen klasörlere koymanız gerekiyor:

### 1. Zaman Çizelgesi Fotoğrafları
Bu fotoğrafları `client/public/images/timeline/` klasörüne koyun:

- `1924.webp` → `client/public/images/timeline/1924.webp` (Konservatuar Kurulması)
- `1926.webp` → `client/public/images/timeline/1926.webp` (Türk Beşleri Projesi) 
- `1934.jpg` → `client/public/images/timeline/1934.jpg` (Konservatuar Açılışı)

### 2. Türk Beşleri Fotoğrafları
Bu fotoğrafları `client/public/images/composers/` klasörüne koyun:

- `11c.webp` → `client/public/images/composers/cemal-resit-rey.webp` (Cemal Reşit Rey)
- `13u.webp` → `client/public/images/composers/ulvi-cemal-erkin.webp` (Ulvi Cemal Erkin)
- `12a.webp` → `client/public/images/composers/ahmet-adnan-saygun.webp` (Ahmet Adnan Saygun)
- `14h.webp` → `client/public/images/composers/hasan-ferit-alnar.webp` (Hasan Ferit Alnar)
- `15n.webp` → `client/public/images/composers/necil-kazim-akses.webp` (Necil Kâzım Akses)

## Klasör Yapısı
ZIP indirdikten sonra projenizin klasör yapısı şöyle olmalı:

```
proje-kök-klasörü/
├── client/
│   ├── public/
│   │   └── images/
│   │       ├── timeline/
│   │       │   ├── 1924.webp
│   │       │   ├── 1926.webp
│   │       │   └── 1934.jpg
│   │       └── composers/
│   │           ├── cemal-resit-rey.webp
│   │           ├── ulvi-cemal-erkin.webp
│   │           ├── ahmet-adnan-saygun.webp
│   │           ├── hasan-ferit-alnar.webp
│   │           └── necil-kazim-akses.webp
│   └── src/
├── server/
├── shared/
└── package.json
```

## Önemli Notlar

1. **Klasörleri oluşturun**: Eğer `images`, `timeline` ve `composers` klasörleri yoksa, bunları elle oluşturmanız gerekiyor.

2. **Dosya adları önemli**: Fotoğraf dosya adlarını tam olarak yukarıda belirtildiği gibi değiştirin. Kod bu adları kullanarak fotoğrafları gösteriyor.

3. **Dosya formatları**: Fotoğrafların formatları (.webp, .jpg) önemli, değiştirmeyin.

4. **Büyük/küçük harf**: Dosya adlarında büyük/küçük harf duyarlılığına dikkat edin.

## Projeyi Çalıştırma

Fotoğrafları yerleştirdikten sonra:

1. Terminal açın
2. `npm install` komutunu çalıştırın
3. `npm run dev` komutunu çalıştırın
4. Tarayıcıda `http://localhost:5000` adresini açın

Uygulama çalıştığında zaman çizelgesi ve Türk Beşleri sayfalarında fotoğraflar görünecektir.