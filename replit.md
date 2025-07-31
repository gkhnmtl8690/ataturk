# Atatürk ve Müzik - Türkçe Eğitim Uygulaması

## Genel Bakış

Atatürk'ün müziğe verdiği önem ve Türk müziğinin gelişimini anlatan Türkçe eğitim uygulaması. Kullanıcı tercihi doğrultusunda tamamen Türkçe arayüz ve sadece kullanıcının belirttiği içeriklerle oluşturulmuştur.

## Kullanıcı Tercihleri

- **İletişim Dili**: Türkçe
- **İçerik Kısıtlaması**: Sadece kullanıcının belirttiği yazılar ve özellikler kullanılacak
- **Ekranlarda Scrollbar**: Scrollbar kullanılmayacak

## Sistem Mimarisi

### Frontend Mimarisi
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter (hafif React router)
- **UI Framework**: shadcn/ui bileşenleri
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)

### Backend Mimarisi
- **Runtime**: Node.js with Express.js
- **API Pattern**: RESTful API
- **File Upload**: Multer middleware
- **Data Storage**: In-memory storage (MemStorage)

## Ana Sayfalar

### 1. Ana Sayfa (/)
- **Başlık**: "Atatürk ve Müzik"
- **Butonlar**:
  - 📅 Zaman Çizelgesi (mavi)
  - 🎼 Türk Beşleri (yeşil)
  - 🎵 Müzikler (mor)
  - 🎺 Marşlar (sarı)

### 2. Zaman Çizelgesi (/timeline)
- Atatürk'ün müziğe verdiği önemle ilgili kronolojik tarih içeriği
- 1881-1938 yılları arası önemli olaylar
- Timeline görünümü ile düzenlenmiş

### 3. Türk Beşleri (/composers)
- Yurt dışına gönderilen bestecilerin listesi
- Her besteci için ayrı detay sayfası (/composers/:id)
- Fotoğraf ve hayat hikayesi (scrollbar olmadan)

### 4. Müzikler (/music)
- MP3/MP4 dosya yükleme sayfası
- Atatürk'ün sevdiği şarkı ve türküler listesi
- Listedeki şarkılara tıklayınca çalma özelliği
- Yüklenen müzikleri oynatma/silme

### 5. Marşlar (/marches)
- MP3/MP4 dosya yükleme sayfası
- Yüklenen marşları oynatma/silme

## Veri Modeli

### MusicFile
- Yüklenen müzik/marş dosyaları için
- Type field ile "music" veya "march" ayrımı

### FavoriteMusic
- Atatürk'ün sevdiği şarkılar için sabit liste
- Önceden tanımlanmış 5 şarkı/türkü

### TimelineEvent
- Zaman çizelgesi olayları
- 1881-1938 yılları arası 12 önemli olay

### TurkishComposer
- Türk Beşleri bestecileri
- 5 besteci: Cemal Reşit Rey, Ulvi Cemal Erkin, Ahmet Adnan Saygun, Hasan Ferit Alnar, Necil Kâzım Akses

## Temel Özellikler

### Dosya Yükleme
- MP3 ve MP4 formatları desteklenir
- 50MB dosya boyutu sınırı
- Multer middleware ile güvenli yükleme

### Müzik Çalma
- HTML5 audio element kullanımı
- Play/Pause kontrolleri
- Tek seferde bir dosya çalma

### Renk Temaları
- Kırmızı: Ana tema (Türk bayrağı)
- Mavi: Zaman çizelgesi
- Yeşil: Türk Beşleri
- Mor: Müzikler
- Sarı: Marşlar

## Dağıtım Stratejisi

### Build Süreci
1. Frontend: Vite builds React app to `dist/public`
2. Backend: Express serves both API and static files
3. Upload klasörü: Yüklenen dosyalar için

### Environment Configuration
- Development: Vite dev server with Express API
- Production: Express serves both API and frontend
- File storage: Local filesystem uploads folder

## Son Değişiklikler

### 31 Ocak 2025
- ✓ Türkçe ana sayfa oluşturuldu
- ✓ Zaman çizelgesi sayfası tamamlandı
- ✓ Türk Beşleri listesi ve detay sayfaları eklendi
- ✓ Müzik yükleme ve çalma sayfası hazırlandı
- ✓ Marş yükleme sayfası oluşturuldu
- ✓ Dosya yükleme ve çalma API'leri tamamlandı
- → Uygulama test edilmeye hazır