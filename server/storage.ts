import { type MusicFile, type InsertMusicFile, type FavoriteMusic, type InsertFavoriteMusic, type TimelineEvent, type TurkishComposer, type FavoriteMarch } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Music file operations
  getMusicFiles(type?: string): Promise<MusicFile[]>;
  getMusicFile(id: string): Promise<MusicFile | undefined>;
  createMusicFile(file: InsertMusicFile): Promise<MusicFile>;
  deleteMusicFile(id: string): Promise<boolean>;
  
  // Favorite music operations
  getFavoriteMusics(): Promise<FavoriteMusic[]>;
  getFavoriteMusic(id: string): Promise<FavoriteMusic | undefined>;
  createFavoriteMusic(music: InsertFavoriteMusic): Promise<FavoriteMusic>;
  deleteFavoriteMusic(id: string): Promise<boolean>;

  // Favorite march operations
  getFavoriteMarches(): Promise<FavoriteMarch[]>;

  // Static data operations
  getTimelineEvents(): Promise<TimelineEvent[]>;
  getTurkishComposers(): Promise<TurkishComposer[]>;
  getTurkishComposer(id: string): Promise<TurkishComposer | undefined>;
}

export class MemStorage implements IStorage {
  private musicFiles: Map<string, MusicFile>;
  private favoriteMusics: Map<string, FavoriteMusic>;
  private favoriteMarches: Map<string, FavoriteMarch>;

  constructor() {
    this.musicFiles = new Map();
    this.favoriteMusics = new Map();
    this.favoriteMarches = new Map();
    this.initializeFavoriteMusics();
    this.initializeFavoriteMarches();
  }

  private initializeFavoriteMusics() {
    const favoriteMusics: FavoriteMusic[] = [
      {
        id: randomUUID(),
        title: "Yanık Ömer",
        artist: "Türk Halk Müziği",
        filename: "yanik.mp4",
        description: "Atatürk'ün sevdiği türkülerden biri",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Sobalarında Guru da Meşe Yanıyor",
        artist: "Türk Halk Müziği",
        filename: "soba.mp4",
        description: "Atatürk'ün çok sevdiği türkülerden",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Çökertmeden Çıktımda Halilim",
        artist: "Türk Halk Müziği",
        filename: "cokertme.mp4",
        description: "Atatürk'ün sevdiği türkülerden",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Mızıka Çalındı Düğünmü Sandın",
        artist: "Türk Halk Müziği",
        filename: "mizika.mp4",
        description: "Atatürk'ün sevdiği türkülerden",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Ata Barı",
        artist: "Türk Halk Müziği",
        filename: "atabari.mp4",
        description: "Atatürk döneminin önemli şarkılarından",
        createdAt: new Date(),
      }
    ];

    favoriteMusics.forEach(music => {
      this.favoriteMusics.set(music.id, music);
    });
  }

  private initializeFavoriteMarches() {
    const favoriteMarches: FavoriteMarch[] = [
      {
        id: randomUUID(),
        title: "BAYRAĞIM",
        filename: "5bayrak.mp4",
        description: "Türk bayrağına adanmış marş",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "ATATÜRK ÖLMEDİ",
        filename: "5olmedi.mp4",
        description: "Atatürk'ün ebediyetini anlatan marş",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "CUMHURİYET",
        filename: "6cumhuriyet.mp4",
        description: "Cumhuriyet değerlerini anlatan marş",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "SEVGİ DOLU ATA'M",
        filename: "6sevgi.mp4",
        description: "Atatürk'e duyulan sevgiyi anlatan marş",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "BAYRAK MARŞI",
        filename: "7bayrak.mp4",
        description: "Türk bayrağı marşı",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "10.YIL MARŞI",
        filename: "7onuncu.mp4",
        description: "Cumhuriyet'in 10. yılı marşı",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "VATAN MARŞI",
        filename: "7vatan.mp4",
        description: "Vatana sevgiyi anlatan marş",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "ATA'M",
        filename: "7istiklal.mp4",
        description: "Atatürk'e övgü marşı",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "İZİNDEYİZ",
        filename: "8izindeyiz.mp4",
        description: "Atatürk'ün izinde olduğumuzu anlatan marş",
        createdAt: new Date(),
      }
    ];

    favoriteMarches.forEach(march => {
      this.favoriteMarches.set(march.id, march);
    });
  }

  async getMusicFiles(type?: string): Promise<MusicFile[]> {
    let files = Array.from(this.musicFiles.values());
    if (type) {
      files = files.filter(file => file.type === type);
    }
    return files.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }

  async getMusicFile(id: string): Promise<MusicFile | undefined> {
    return this.musicFiles.get(id);
  }

  async createMusicFile(insertFile: InsertMusicFile): Promise<MusicFile> {
    const id = randomUUID();
    const file: MusicFile = {
      ...insertFile,
      id,
      uploadedAt: new Date(),
    };
    this.musicFiles.set(id, file);
    return file;
  }

  async deleteMusicFile(id: string): Promise<boolean> {
    return this.musicFiles.delete(id);
  }

  async getFavoriteMusics(): Promise<FavoriteMusic[]> {
    return Array.from(this.favoriteMusics.values())
      .sort((a, b) => a.title.localeCompare(b.title, 'tr'));
  }

  async getFavoriteMusic(id: string): Promise<FavoriteMusic | undefined> {
    return this.favoriteMusics.get(id);
  }

  async createFavoriteMusic(insertMusic: InsertFavoriteMusic): Promise<FavoriteMusic> {
    const id = randomUUID();
    const music: FavoriteMusic = {
      ...insertMusic,
      id,
      filename: insertMusic.filename || null,
      artist: insertMusic.artist || null,
      description: insertMusic.description || null,
      createdAt: new Date(),
    };
    this.favoriteMusics.set(id, music);
    return music;
  }

  async deleteFavoriteMusic(id: string): Promise<boolean> {
    return this.favoriteMusics.delete(id);
  }

  async getFavoriteMarches(): Promise<FavoriteMarch[]> {
    return Array.from(this.favoriteMarches.values())
      .sort((a, b) => a.title.localeCompare(b.title, 'tr'));
  }

  async getTimelineEvents(): Promise<TimelineEvent[]> {
    return [
      {
        year: "1881",
        title: "Doğum",
        description: "Mustafa Kemal Atatürk, Selanik'te doğdu. Çocukluk yıllarından itibaren müziğe olan ilgisi dikkat çekiyordu."
      },
      {
        year: "1899",
        title: "Askeri Okul Yılları",
        description: "Manastır Askeri İdadisi'nde öğrenim görürken, Batı müziği ile tanıştı ve piyano dersleri almaya başladı."
      },
      {
        year: "1908",
        title: "Jön Türkler Dönemi",
        description: "İttihat ve Terakki Cemiyeti'nin faaliyetleri sırasında, müziğin toplumsal değişimdeki rolünü keşfetti."
      },
      {
        year: "1919",
        title: "Kurtuluş Savaşı",
        description: "Milli Mücadele döneminde, halk türkülerinin ve marşların morali yükseltmedeki önemini gözlemledi."
      },
      {
        year: "1923",
        title: "Cumhuriyet'in İlanı",
        description: "Türkiye Cumhuriyeti kurulduktan sonra, müzik reformlarına başladı. Batı müziği eğitimini yaygınlaştırmak için çalışmalar başlattı."
      },
      {
        year: "1924",
        title: "Konservatuar Kurulması",
        description: "Ankara'da Devlet Konservatuarı'nın kuruluş çalışmaları başladı. Müzik eğitiminin kurumsallaşması hedeflendi.",
        image: "/images/timeline/1924.webp"
      },
      {
        year: "1926",
        title: "Türk Beşleri Projesi",
        description: "Türk müziğini çağdaşlaştırmak için genç müzisyenleri Avrupa'ya gönderme kararı aldı.",
        image: "/images/timeline/1926.webp"
      },
      {
        year: "1928",
        title: "Harf İnkılabı ve Müzik",
        description: "Latin harflerinin kabulü ile birlikte, müzik nota sisteminin de yaygınlaştırılması planlandı."
      },
      {
        year: "1930",
        title: "Halk Evleri",
        description: "Halk Evleri'nde müzik faaliyetlerinin düzenlenmesi, halk müziği ile sanat müziğinin kaynaşması için önemli adımlar atıldı."
      },
      {
        year: "1934",
        title: "Konservatuar Açılışı",
        description: "Ankara Devlet Konservatuarı resmen açıldı. Paul Hindemith gibi ünlü besteciler davet edildi.",
        image: "/images/timeline/1934.jpg"
      },
      {
        year: "1936",
        title: "Türk Beşleri'nin Dönüşü",
        description: "Avrupa'da eğitim alan genç besteciler Türkiye'ye dönerek, modern Türk müziğinin temellerini attılar."
      },
      {
        year: "1938",
        title: "Son Yıllar",
        description: "Atatürk'ün vefatına kadar müziğe olan ilgisi devam etti. Dolmabahçe Sarayı'nda düzenli müzik dinletileri yapılıyordu."
      }
    ];
  }

  async getTurkishComposers(): Promise<TurkishComposer[]> {
    return [
      {
        id: "cemal-resit-rey",
        name: "Cemal Reşit Rey",
        birthYear: "1904",
        deathYear: "1985",
        photo: "/images/composers/cemal-resit-rey.webp",
        biography: "Türk Beşleri'nin önde gelen isimlerinden biri olan Cemal Reşit Rey, 1904 yılında İstanbul'da doğdu. Atatürk'ün direktifleri doğrultusunda Paris'te müzik eğitimi aldı. Türk müziğini çağdaş kompozisyon teknikleriyle harmanlayan eserleriyle tanınır.",
        achievements: [
          "İstanbul Şehir Tiyatroları'nda şef olarak çalıştı",
          "Çeşitli senfonik eserler besteledi",
          "Opera ve bale müzikleri yazdı",
          "Türk halk müziği motiflerini sanat müziğinde kullandı"
        ]
      },
      {
        id: "ulvi-cemal-erkin",
        name: "Ulvi Cemal Erkin",
        birthYear: "1906",
        deathYear: "1972",
        photo: "/images/composers/ulvi-cemal-erkin.webp",
        biography: "Türk Beşleri'nin en genç üyesi olan Ulvi Cemal Erkin, İstanbul'da doğdu. Paris Konservatuarı'nda eğitim aldıktan sonra Türkiye'ye dönerek Ankara Devlet Konservatuarı'nda çalıştı. Türk halk müziği kaynaklarından beslenen modern eserler yazdı.",
        achievements: [
          "Piyano Konçertosu gibi önemli eserler besteledi",
          "Ankara Devlet Konservatuarı'nda öğretmenlik yaptı",
          "Türk halk oyunları için müzikler yazdı",
          "Devlet Sanatçısı unvanını aldı"
        ]
      },
      {
        id: "ahmet-adnan-saygun",
        name: "Ahmet Adnan Saygun",
        birthYear: "1907",
        deathYear: "1991",
        photo: "/images/composers/ahmet-adnan-saygun.webp",
        biography: "Türk Beşleri'nin en üretken bestecilerinden Ahmet Adnan Saygun, İzmir'de doğdu. Paris'te eğitim aldıktan sonra Türkiye'ye dönerek Türk müzikolojisinin gelişmesine büyük katkılar sağladı. Béla Bartók ile birlikte Anadolu'da halk müziği derlemeleri yaptı.",
        achievements: [
          "5 senfoni ve 2 opera besteledi",
          "Yunus Emre Oratoryo'su ile dünya çapında tanındı",
          "Ankara Devlet Konservatuarı'nın kurucu öğretmenlerinden",
          "UNESCO müzik ödülünü aldı"
        ]
      },
      {
        id: "hasan-ferit-alnar",
        name: "Hasan Ferit Alnar",
        birthYear: "1906",
        deathYear: "1978",
        photo: "/images/composers/hasan-ferit-alnar.webp",
        biography: "Türk Beşleri'nin başka bir önemli üyesi olan Hasan Ferit Alnar, İstanbul'da doğdu. Paris'te almış olduğu eğitimin ardından Türkiye'ye dönerek eğitim alanında çalıştı. Özellikle oda müziği alanında önemli eserler verdi.",
        achievements: [
          "Keman ve piyano için eserler besteledi",
          "Ankara Devlet Konservatuarı'nda öğretmenlik yaptı",
          "Türk halk müziği araştırmaları yaptı",
          "Çok sayıda öğrenci yetiştirdi"
        ]
      },
      {
        id: "necil-kazim-akses",
        name: "Necil Kâzım Akses",
        birthYear: "1908",
        deathYear: "1999",
        photo: "/images/composers/necil-kazim-akses.webp",
        biography: "Türk Beşleri'nin beşinci üyesi Necil Kâzım Akses, İstanbul'da doğdu. Viyana'da müzik eğitimi aldıktan sonra Türkiye'ye dönerek besteciliğin yanı sıra müzik yazarlığı da yaptı. Türk müziğinin teorik temellerinin oluşturulmasında önemli rol oynadı.",
        achievements: [
          "Sayısız senfoni ve konçerto besteledi",
          "Müzik teorisi üzerine kitaplar yazdı",
          "Ankara Radyosu'nda müzik yayınları yönetti",
          "Türkiye'de müzik eleştirmenliğinin öncülerinden"
        ]
      }
    ];
  }

  async getTurkishComposer(id: string): Promise<TurkishComposer | undefined> {
    const composers = await this.getTurkishComposers();
    return composers.find(composer => composer.id === id);
  }
}

export const storage = new MemStorage();