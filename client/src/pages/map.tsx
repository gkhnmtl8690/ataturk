import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/app-header";
import { EventMap } from "@/components/event-map";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useOffline } from "@/hooks/use-offline";
import { LocalStorage } from "@/lib/storage";
import { type Event } from "@shared/schema";

export default function MapPage() {
  const { location } = useGeolocation();
  const { isOffline } = useOffline();

  const { data: events = [] } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    enabled: !isOffline,
  });

  const displayEvents = isOffline ? LocalStorage.getCachedEvents() || [] : events;

  const handleEventClick = (event: Event) => {
    // TODO: Show event details modal or navigate to details page
    console.log("Event clicked:", event);
  };

  const mapCenter = location 
    ? { lat: location.latitude, lng: location.longitude }
    : { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

  return (
    <div className="min-h-screen bg-travel-surface pb-20">
      <AppHeader />
      
      <div className="h-[calc(100vh-140px)] p-4">
        <div className="bg-white rounded-lg elevation-1 h-full overflow-hidden">
          <EventMap
            events={displayEvents}
            center={mapCenter}
            onEventClick={handleEventClick}
          />
        </div>
      </div>

      {isOffline && (
        <div className="px-4 pb-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">
              You're viewing cached map data. Connect to the internet for the latest events.
            </p>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
