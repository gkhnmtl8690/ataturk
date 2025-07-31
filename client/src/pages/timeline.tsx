import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { type TimelineEvent } from "@shared/schema";

export default function TimelinePage() {
  const { data: events = [], isLoading } = useQuery<TimelineEvent[]>({
    queryKey: ["/api/timeline"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-red-600">
            Atatürk'ün Müziğe Verdiği Önem - Zaman Çizelgesi
          </h1>
        </div>

        {/* Timeline - 2 Column Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border-l-4 border-red-600">
                {event.image && (
                  <div className="w-full h-48">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-4">
                      {event.year}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}