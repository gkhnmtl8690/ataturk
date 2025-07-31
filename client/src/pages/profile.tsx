import { useState } from "react";
import { AppHeader } from "@/components/app-header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { LocalStorage } from "@/lib/storage";
import { User, Settings, Database, Bell, Shield, Info } from "lucide-react";

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  const handleClearCache = () => {
    LocalStorage.clearCache();
    alert("Cache cleared successfully!");
  };

  const cacheTimestamp = LocalStorage.getCacheTimestamp();
  const cachedEvents = LocalStorage.getCachedEvents();

  return (
    <div className="min-h-screen bg-travel-surface pb-20">
      <AppHeader />
      
      <div className="px-4 py-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-travel-primary rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Travel Explorer</h1>
            <p className="text-gray-600">Budget-conscious traveler</p>
          </div>
        </div>

        {/* Settings Cards */}
        <div className="space-y-4">
          {/* Notifications */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Event Notifications</p>
                  <p className="text-sm text-gray-600">Get notified about nearby events</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Location Services */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Shield className="w-5 h-5" />
                <span>Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Location Services</p>
                  <p className="text-sm text-gray-600">Allow location access for nearby events</p>
                </div>
                <Switch
                  checked={locationServices}
                  onCheckedChange={setLocationServices}
                />
              </div>
            </CardContent>
          </Card>

          {/* Cache Management */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Database className="w-5 h-5" />
                <span>Offline Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Cached Events</p>
                <p className="text-sm text-gray-600">
                  {cachedEvents ? `${cachedEvents.length} events cached` : "No cached events"}
                </p>
                {cacheTimestamp && (
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date(cacheTimestamp).toLocaleString()}
                  </p>
                )}
              </div>
              <Button
                onClick={handleClearCache}
                variant="outline"
                className="w-full"
              >
                Clear Cache
              </Button>
            </CardContent>
          </Card>

          {/* App Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Info className="w-5 h-5" />
                <span>About</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Version</span>
                  <span>1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Build</span>
                  <span>2024.1</span>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  TravelBuddy helps you discover budget-friendly local events and activities
                  with offline functionality for when you're on the go.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
