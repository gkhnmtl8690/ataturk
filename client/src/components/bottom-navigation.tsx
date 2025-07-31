import { Home, Bookmark, Map, User } from "lucide-react";
import { Link, useLocation } from "wouter";

const navItems = [
  { path: "/", icon: Home, label: "Discover" },
  { path: "/saved", icon: Bookmark, label: "Saved" },
  { path: "/map", icon: Map, label: "Map" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomNavigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 elevation-2">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link key={item.path} href={item.path}>
              <button className={`flex flex-col items-center py-2 px-3 transition-colors ${
                isActive 
                  ? "text-travel-primary" 
                  : "text-gray-500 hover:text-travel-primary"
              }`}>
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
