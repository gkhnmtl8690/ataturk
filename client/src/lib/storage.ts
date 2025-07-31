import { type Event } from "@shared/schema";

const STORAGE_KEYS = {
  CACHED_EVENTS: "travelbuddy_cached_events",
  LAST_LOCATION: "travelbuddy_last_location",
  SAVED_EVENTS: "travelbuddy_saved_events",
  CACHE_TIMESTAMP: "travelbuddy_cache_timestamp",
} as const;

export class LocalStorage {
  static cacheEvents(events: Event[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CACHED_EVENTS, JSON.stringify(events));
      localStorage.setItem(STORAGE_KEYS.CACHE_TIMESTAMP, Date.now().toString());
    } catch (error) {
      console.warn("Failed to cache events:", error);
    }
  }

  static getCachedEvents(): Event[] | null {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.CACHED_EVENTS);
      if (!cached) return null;

      const events = JSON.parse(cached);
      // Convert date strings back to Date objects
      return events.map((event: any) => ({
        ...event,
        startTime: new Date(event.startTime),
        endTime: event.endTime ? new Date(event.endTime) : null,
        createdAt: new Date(event.createdAt),
      }));
    } catch (error) {
      console.warn("Failed to get cached events:", error);
      return null;
    }
  }

  static getCacheTimestamp(): number | null {
    try {
      const timestamp = localStorage.getItem(STORAGE_KEYS.CACHE_TIMESTAMP);
      return timestamp ? parseInt(timestamp) : null;
    } catch (error) {
      return null;
    }
  }

  static isCacheStale(maxAgeMs: number = 2 * 60 * 60 * 1000): boolean {
    const timestamp = this.getCacheTimestamp();
    if (!timestamp) return true;
    return Date.now() - timestamp > maxAgeMs;
  }

  static cacheLocation(location: { latitude: number; longitude: number; address?: string }) {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(location));
    } catch (error) {
      console.warn("Failed to cache location:", error);
    }
  }

  static getLastLocation(): { latitude: number; longitude: number; address?: string } | null {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      return null;
    }
  }

  static saveSavedEvents(eventIds: string[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_EVENTS, JSON.stringify(eventIds));
    } catch (error) {
      console.warn("Failed to save saved events:", error);
    }
  }

  static getSavedEventIds(): string[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_EVENTS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  }

  static clearCache() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.warn("Failed to clear cache:", error);
    }
  }
}
