import { Star, Palette, Mountain, Utensils, Music } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Star },
  { id: "cultural", label: "Cultural", icon: Palette },
  { id: "outdoor", label: "Outdoor", icon: Mountain },
  { id: "food", label: "Food", icon: Utensils },
  { id: "entertainment", label: "Entertainment", icon: Music },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <section className="px-4 mb-4">
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-travel-primary text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
