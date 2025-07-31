import { useState } from "react";
import { MapPin, Clock, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Event } from "@shared/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
  isSaved?: boolean;
  onViewDetails?: (event: Event) => void;
}

const categoryIcons = {
  cultural: "🎨",
  outdoor: "🏔️",
  food: "🍽️",
  entertainment: "🎵",
};

export function EventCard({ event, isSaved = false, onViewDetails }: EventCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const saveEventMutation = useMutation({
    mutationFn: async () => {
      if (saved) {
        await apiRequest("DELETE", `/api/saved-events/${event.id}`);
        return false;
      } else {
        await apiRequest("POST", "/api/saved-events", { eventId: event.id });
        return true;
      }
    },
    onSuccess: (newSavedState) => {
      setSaved(newSavedState);
      queryClient.invalidateQueries({ queryKey: ["/api/saved-events"] });
      toast({
        title: newSavedState ? "Event Saved" : "Event Removed",
        description: newSavedState 
          ? "Event has been added to your saved list"
          : "Event has been removed from your saved list",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update saved event",
        variant: "destructive",
      });
    },
  });

  const formatPrice = (price: string, priceRange: string) => {
    if (priceRange === "free") return "FREE";
    if (priceRange === "1-15" && price === "15.00") return "$8-25";
    return `$${parseInt(price)}`;
  };

  const getPriceColor = (priceRange: string) => {
    if (priceRange === "free") return "bg-travel-success";
    if (priceRange === "30+") return "bg-travel-secondary";
    return "bg-travel-accent";
  };

  const calculateDistance = (lat: number, lon: number) => {
    // This is a simplified distance calculation
    // In a real app, you'd use the user's actual location
    const sfLat = 37.7749;
    const sfLon = -122.4194;
    const R = 3959; // Earth's radius in miles
    const dLat = (lat - sfLat) * Math.PI / 180;
    const dLon = (lon - sfLon) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(sfLat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const distance = calculateDistance(parseFloat(event.latitude), parseFloat(event.longitude));

  return (
    <div className="bg-white rounded-xl elevation-1 mb-4 overflow-hidden">
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.name}
          className="w-full h-32 object-cover"
        />
        <div className={`absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs font-bold ${getPriceColor(event.priceRange)}`}>
          {formatPrice(event.price, event.priceRange)}
        </div>
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {categoryIcons[event.category as keyof typeof categoryIcons]} {event.category}
        </div>
        <button
          onClick={() => saveEventMutation.mutate()}
          disabled={saveEventMutation.isPending}
          className="absolute top-2 right-14 bg-white bg-opacity-90 text-gray-700 p-1 rounded-full hover:bg-white transition-colors"
        >
          {saved ? (
            <BookmarkCheck className="w-4 h-4 text-travel-primary" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1">{event.name}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{event.location}</span>
          <span className="mx-2">•</span>
          <span>{distance} mi</span>
        </div>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{format(new Date(event.startTime), "EEE, h:mm a")}</span>
          </div>
          <Button 
            onClick={() => onViewDetails?.(event)}
            className="bg-travel-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
