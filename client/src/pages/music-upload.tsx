import { useState, useRef } from "react";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Play, Pause, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { type MusicFile, type FavoriteMusic } from "@shared/schema";

export default function MusicUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [musicName, setMusicName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch uploaded music files
  const { data: uploadedFiles = [] } = useQuery<MusicFile[]>({
    queryKey: ["/api/music-files", { type: "music" }],
    queryFn: () => fetch("/api/music-files?type=music").then(res => res.json()),
  });

  // Fetch favorite musics
  const { data: favoriteMusics = [] } = useQuery<FavoriteMusic[]>({
    queryKey: ["/api/favorite-musics"],
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/music-files", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Upload failed");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/music-files"] });
      setSelectedFile(null);
      setMusicName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast({
        title: "Başarılı",
        description: "Müzik dosyası yüklendi",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Dosya yüklenemedi",
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/music-files/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/music-files"] });
      toast({
        title: "Başarılı",
        description: "Müzik dosyası silindi",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Dosya silinemedi",
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/mp4', 'video/mp4'];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setMusicName(file.name.replace(/\.[^/.]+$/, ""));
      } else {
        toast({
          title: "Hata",
          description: "Sadece MP3 ve MP4 dosyaları kabul edilir",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !musicName.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen dosya seçin ve isim girin",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("name", musicName.trim());
    formData.append("type", "music");

    uploadMutation.mutate(formData);
  };

  const handlePlay = (audioUrl: string, id: string) => {
    if (playingAudio === id) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setPlayingAudio(id);
      }
    }
  };

  const handlePlayFavorite = (filename: string, id: string) => {
    // Check if it's a video file
    if (filename.endsWith('.mp4')) {
      handlePlayVideo(`/videos/music/${filename}`, id);
    } else {
      toast({
        title: "Bilgi",
        description: `${filename} çalmak için gerçek dosya gerekiyor`,
      });
    }
  };

  const handlePlayVideo = (videoUrl: string, id: string) => {
    if (playingVideo === id) {
      videoRef.current?.pause();
      setPlayingVideo(null);
    } else {
      if (videoRef.current) {
        videoRef.current.src = videoUrl;
        videoRef.current.play();
        setPlayingVideo(id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-purple-600">
            Müzikler
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Müzik Dosyası Yükle
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosya Seç (MP3/MP4)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".mp3,.mp4,audio/mpeg,audio/mp4,video/mp4"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Müzik Adı
                </label>
                <Input
                  value={musicName}
                  onChange={(e) => setMusicName(e.target.value)}
                  placeholder="Müzik adını girin"
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || !musicName.trim() || uploadMutation.isPending}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {uploadMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Yükleniyor...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Yükle
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Atatürk'ün Sevdiği Şarkılar */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Atatürk'ün Sevdiği Şarkı ve Türküler
            </h2>
            
            <div className="space-y-3">
              {favoriteMusics.map((music) => (
                <div key={music.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{music.title}</h3>
                    {music.artist && (
                      <p className="text-sm text-gray-600">{music.artist}</p>
                    )}
                    <p className="text-xs text-gray-500">{music.description}</p>
                  </div>
                  <Button
                    onClick={() => handlePlayFavorite(music.filename || "", music.id)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white ml-4"
                  >
                    {playingVideo === music.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Yüklenen Müzikler
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-800 mb-2">{file.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{file.originalName}</p>
                    <div className="flex justify-between items-center">
                      <Button
                        onClick={() => handlePlay(`/uploads/${file.filename}`, file.id)}
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {playingAudio === file.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        onClick={() => deleteMutation.mutate(file.id)}
                        size="sm"
                        variant="destructive"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Video Player */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Video Oynatıcı</h2>
            <video
              ref={videoRef}
              className="w-full h-96 bg-black rounded-lg"
              controls
              onEnded={() => setPlayingVideo(null)}
              onError={() => setPlayingVideo(null)}
            >
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
        </div>

        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          onEnded={() => setPlayingAudio(null)}
          onError={() => setPlayingAudio(null)}
        />
      </div>
    </div>
  );
}