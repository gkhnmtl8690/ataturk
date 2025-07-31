import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-red-600 mb-4">
            Atatürk ve Müzik
          </h1>
          <div className="w-32 h-1 bg-red-600 mx-auto"></div>
        </div>

        {/* Navigation Buttons */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-6">
          <Link href="/timeline">
            <Button 
              className="w-full h-20 text-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              📅 Zaman Çizelgesi
            </Button>
          </Link>

          <Link href="/composers">
            <Button 
              className="w-full h-20 text-xl font-semibold bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              🎼 Türk Beşleri
            </Button>
          </Link>

          <Link href="/music">
            <Button 
              className="w-full h-20 text-xl font-semibold bg-purple-600 hover:bg-purple-700 text-white"
              size="lg"
            >
              🎵 Müzikler
            </Button>
          </Link>

          <Link href="/marches">
            <Button 
              className="w-full h-20 text-xl font-semibold bg-yellow-600 hover:bg-yellow-700 text-white"
              size="lg"
            >
              🎺 Marşlar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}