import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { type TurkishComposer } from "@shared/schema";

export default function ComposerDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: composer, isLoading } = useQuery<TurkishComposer>({
    queryKey: ["/api/composers", id],
    queryFn: () => fetch(`/api/composers/${id}`).then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!composer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Besteci bulunamadı</h2>
          <Link href="/composers">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Türk Beşleri'ne Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/composers">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Türk Beşleri
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-green-600">
            {composer.name}
          </h1>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Photo and basic info */}
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-80 md:h-full bg-gray-200 flex items-center justify-center">
                  <img 
                    src={composer.photo} 
                    alt={composer.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {composer.name}
                </h2>
                
                <div className="mb-6">
                  <p className="text-xl text-gray-600 mb-2">
                    <strong>Doğum:</strong> {composer.birthYear}
                  </p>
                  {composer.deathYear && (
                    <p className="text-xl text-gray-600 mb-4">
                      <strong>Vefat:</strong> {composer.deathYear}
                    </p>
                  )}
                </div>

                {/* Biography */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Hayatı</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {composer.biography}
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Başlıca Eserleri ve Başarıları</h3>
                  <ul className="space-y-2">
                    {composer.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 text-xl mr-3">•</span>
                        <span className="text-gray-700 text-lg">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}