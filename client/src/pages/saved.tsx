import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/app-header";
import { EventCard } from "@/components/event-card";
import { BottomNavigation } from "@/components/bottom-navigation";
import { type Event } from "@shared/schema";
import { Bookmark } from "lucide-react";

export default function SavedPage() {
  const { data: savedEvents = [], isLoading } = useQuery<Event[]>({
    queryKey: ["/api/saved-events"],
  });

  return (
    <div className="min-h-screen bg-travel-surface pb-20">
      <AppHeader />
      
      <div className="px-4 py-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bookmark className="w-6 h-6 text-travel-primary" />
          <h1 className="text-2xl font-bold text-gray-900">Saved Events</h1>
        </div>

        {isLoading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl elevation-1 p-4 animate-pulse">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {savedEvents.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Events</h3>
            <p className="text-gray-600">
              Start discovering events and save your favorites to see them here.
            </p>
          </div>
        )}

        {savedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            isSaved={true}
          />
        ))}
      </div>

      <BottomNavigation />
    </div>
  );
}
