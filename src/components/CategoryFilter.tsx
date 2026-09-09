import React from 'react';
import { FilterCategory } from '../types';
import { Flame, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  activeFilter: FilterCategory;
  onSelectFilter: (filter: FilterCategory) => void;
  counts: Record<FilterCategory, number>;
}

const FILTERS: { id: FilterCategory; label: string; icon: string }[] = [
  { id: 'All', label: 'All Dishes', icon: '🍽️' },
  { id: 'Italian', label: 'Italian', icon: '🍕' },
  { id: 'Asian', label: 'Asian', icon: '🍜' },
  { id: 'Vegetarian', label: 'Vegetarian', icon: '🥗' },
  { id: 'Non-Vegetarian', label: 'Non-Veg', icon: '🍗' },
  { id: 'Popular', label: 'Popular Hits', icon: '🔥' },
  { id: 'Favorites', label: 'Favorites', icon: '❤️' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeFilter,
  onSelectFilter,
  counts,
}) => {
  return (
    <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2.5 px-1 gap-2 sm:gap-3">
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id;
        const count = counts[filter.id] ?? 0;

        return (
          <button
            key={filter.id}
            id={`filter-btn-${filter.id.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onSelectFilter(filter.id)}
            className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
              isActive
                ? 'bg-linear-to-r from-orange-600 via-amber-600 to-orange-500 text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-500/20'
                : 'bg-white text-stone-700 hover:text-orange-600 border border-stone-200/90 hover:border-orange-200 hover:bg-orange-50/50 shadow-2xs'
            }`}
          >
            <span className="text-base leading-none">{filter.icon}</span>
            <span>{filter.label}</span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-extrabold ${
                isActive
                  ? 'bg-white/25 text-white'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
