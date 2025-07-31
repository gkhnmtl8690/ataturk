import { useOffline } from "@/hooks/use-offline";
import { Wifi, WifiOff } from "lucide-react";

export function NetworkStatus() {
  const { isOnline } = useOffline();

  return (
    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
      isOnline 
        ? "bg-travel-success text-white" 
        : "bg-gray-500 text-white"
    }`}>
      {isOnline ? (
        <>
          <Wifi className="w-3 h-3" />
          <span>Online</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3" />
          <span>Offline</span>
        </>
      )}
    </div>
  );
}
