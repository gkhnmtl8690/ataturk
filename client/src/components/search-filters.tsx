import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  budgetFilter: string;
  onBudgetChange: (budget: string) => void;
  radiusFilter: number;
  onRadiusChange: (radius: number) => void;
}

const budgetOptions = [
  { value: "all", label: "All Budgets" },
  { value: "free", label: "Free" },
  { value: "1-15", label: "$1-15" },
  { value: "16-30", label: "$16-30" },
  { value: "30+", label: "$30+" },
];

const radiusOptions = [
  { value: 5, label: "5 miles" },
  { value: 10, label: "10 miles" },
  { value: 25, label: "25 miles" },
  { value: 50, label: "50 miles" },
];

export function SearchFilters({
  searchQuery,
  onSearchChange,
  budgetFilter,
  onBudgetChange,
  radiusFilter,
  onRadiusChange,
}: SearchFiltersProps) {
  return (
    <section className="bg-white elevation-1 mb-4">
      <div className="px-4 py-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Search events & activities..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-travel-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>

        {/* Budget Filter */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Budget Range</h3>
          <div className="flex space-x-2 overflow-x-auto">
            {budgetOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onBudgetChange(option.value)}
                className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  budgetFilter === option.value
                    ? "bg-travel-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Distance Filter */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Within</span>
          <Select
            value={radiusFilter.toString()}
            onValueChange={(value) => onRadiusChange(parseInt(value))}
          >
            <SelectTrigger className="w-32 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-travel-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {radiusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}
