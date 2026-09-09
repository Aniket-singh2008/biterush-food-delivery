import React from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import { FoodItem } from '../types';
import { FoodCard } from './FoodCard';

interface PopularDishesProps {
  items: FoodItem[];
  onViewAll: () => void;
}

export const PopularDishes: React.FC<PopularDishesProps> = ({ items, onViewAll }) => {
  const popularItems = items.filter((item) => item.isPopular).slice(0, 4);

  return (
    <section id="popular-dishes" className="py-12 sm:py-16 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full mb-3">
              <Flame className="w-3.5 h-3.5 fill-orange-600" />
              <span>Crowd Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-stone-900 tracking-tight">
              Most Popular Dishes
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2">
              Loved by thousands of students and food connoisseurs alike.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 hover:text-orange-700 group cursor-pointer self-start md:self-auto"
          >
            <span>Explore Full Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Popular Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};
