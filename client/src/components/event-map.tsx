import { useEffect, useRef } from "react";
import { type Event } from "@shared/schema";

interface EventMapProps {
  events: Event[];
  center?: { lat: number; lng: number };
  onEventClick?: (event: Event) => void;
}

export function EventMap({ events, center, onEventClick }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Dynamically load Leaflet
    if (!window.L) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (!mapRef.current || mapInstance.current) return;

      const defaultCenter = center || { lat: 37.7749, lng: -122.4194 }; // San Francisco
      
      mapInstance.current = window.L.map(mapRef.current).setView(
        [defaultCenter.lat, defaultCenter.lng],
        12
      );

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      updateMarkers();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    updateMarkers();
  }, [events]);

  const updateMarkers = () => {
    if (!mapInstance.current || !window.L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstance.current.removeLayer(marker);
    });
    markersRef.current = [];

    // Add new markers
    events.forEach(event => {
      const marker = window.L.marker([
        parseFloat(event.latitude),
        parseFloat(event.longitude)
      ]).addTo(mapInstance.current);

      const priceText = event.priceRange === "free" ? "FREE" : `$${parseInt(event.price)}`;
      
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold text-sm mb-1">${event.name}</h3>
          <p class="text-xs text-gray-600 mb-1">${event.location}</p>
          <p class="text-xs mb-2">${event.description.substring(0, 100)}...</p>
          <div class="flex justify-between items-center">
            <span class="text-xs font-bold text-green-600">${priceText}</span>
            <button 
              onclick="window.selectEvent('${event.id}')" 
              class="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        </div>
      `);

      markersRef.current.push(marker);
    });

    // Set global event handler for popup buttons
    (window as any).selectEvent = (eventId: string) => {
      const event = events.find(e => e.id === eventId);
      if (event && onEventClick) {
        onEventClick(event);
      }
    };
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      {!window.L && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-travel-primary mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}
