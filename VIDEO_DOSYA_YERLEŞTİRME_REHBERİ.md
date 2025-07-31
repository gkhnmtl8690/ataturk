# Video Dosyalarını Yerleştirme Rehberi

## Dosya Yapısı

Video dosyalarını zip olarak indirdikten sonra aşağıdaki klasör yapısına göre yerleştirin:

```
client/
├── public/
│   ├── videos/
│   │   ├── music/           # Müzik videoları için
│   │   │   ├── yanik.mp4
│   │   │   ├── soba.mp4
│   │   │   ├── cokertme.mp4
│   │   │   ├── mizika.mp4
│   │   │   └── atabari.mp4
│   │   └── marches/         # Marş videoları için
│   │       ├── 5bayrak.mp4
│   │       ├── 5olmedi.mp4
│   │       ├── 6cumhuriyet.mp4
│   │       ├── 6sevgi.mp4
│   │       ├── 7bayrak.mp4
│   │       ├── 7onuncu.mp4
│   │       ├── 7vatan.mp4
│   │       ├── 7istiklal.mp4
│   │       └── 8izindeyiz.mp4
│   └── images/              # Mevcut resimler
│       ├── timeline/
│       └── composers/
```

## Adım Adım Yerleştirme

### 1. Klasörleri Oluşturun
```
mkdir -p client/public/videos/music
mkdir -p client/public/videos/marches
```

### 2. Müzik Videolarını Yerleştirin
Aşağıdaki video dosyalarını `client/public/videos/music/` klasörüne kopyalayın:
- yanik.mp4 (Yanık Kervan)
- soba.mp4 (Soba Başında)
- cokertme.mp4 (Çökertme)
- mizika.mp4 (Mızıka Çalındı Düğünmü Sandın)
- atabari.mp4 (Ata Barı)

### 3. Marş Videolarını Yerleştirin
Aşağıdaki video dosyalarını `client/public/videos/marches/` klasörüne kopyalayın:
- 5bayrak.mp4 (BAYRAĞIM)
- 5olmedi.mp4 (ATATÜRK ÖLMEDİ)
- 6cumhuriyet.mp4 (CUMHURİYET)
- 6sevgi.mp4 (SEVGİ DOLU ATA'M)
- 7bayrak.mp4 (BAYRAK MARŞI)
- 7onuncu.mp4 (10.YIL MARŞI)
- 7vatan.mp4 (VATAN MARŞI)
- 7istiklal.mp4 (ATA'M)
- 8izindeyiz.mp4 (İZİNDEYİZ)

## Önemli Notlar

1. **Dosya İsimleri**: Dosya isimlerinin tam olarak yukarıdaki gibi olması gerekiyor
2. **Dosya Formatı**: Sadece MP4 formatı destekleniyor
3. **Büyük/Küçük Harf**: Dosya isimlerinde büyük/küçük harf önemli
4. **Dosya Boyutu**: Video dosyaları herhangi bir boyut sınırı olmadan çalışacak

## Video Oynatma Özellikleri

- ✅ Müzikler sayfasında video oynatıcı eklendi
- ✅ Marşlar sayfasında video oynatıcı eklendi
- ✅ Şarkı/marş seçilince otomatik olarak video oynatıcıda açılıyor
- ✅ Play/Pause butonları dinamik olarak değişiyor
- ✅ Tam ekran video kontrolleri mevcut

## Test Etme

Video dosyalarını yerleştirdikten sonra:
1. Müzikler sayfasına gidin
2. "Atatürk'ün Sevdiği Şarkılar" bölümünden herhangi birine tıklayın
3. Video oynatıcıda videonun açıldığını kontrol edin
4. Aynı işlemi Marşlar sayfası için de yapın

Eğer video oynatılmıyorsa dosya yollarını ve isimlerini kontrol edin.