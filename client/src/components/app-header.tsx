import { MapPin, Settings } from "lucide-react";
import { NetworkStatus } from "./network-status";
import { useGeolocation } from "@/hooks/use-geolocation";

interface AppHeaderProps {
  onSettingsClick?: () => void;
}

export function AppHeader({ onSettingsClick }: AppHeaderProps) {
  const { location, loading } = useGeolocation();

  return (
    <header className="bg-white elevation-1 sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MapPin className="text-travel-primary text-xl w-5 h-5" />
            <div>
              <h1 className="font-bold text-lg text-gray-900">
                {loading 
                  ? "Locating..." 
                  : location?.address || "San Francisco, CA"
                }
              </h1>
              <p className="text-sm text-gray-600">Discovering nearby events</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <NetworkStatus />
            <button 
              className="p-2 text-gray-600 hover:text-travel-primary transition-colors"
              onClick={onSettingsClick}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
