import React, { useState } from 'react';
import { Star, Clock, Flame, Heart, Info } from 'lucide-react';
import { FoodItem } from '../types';
import { DietaryBadge } from './DietaryBadge';
import { QuantityControl } from './QuantityControl';
import { useCart } from '../context/CartContext';

interface FoodCardProps {
  item: FoodItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(item.image);
  const { isFavorite, toggleFavorite, setSelectedDish } = useCart();

  const favorited = isFavorite(item.id);

  // Fallback image in case external network fails
  const handleImageError = () => {
    setImgSrc(
      item.category === 'Italian'
        ? 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80'
    );
  };

  const handleOpenDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDish(item);
  };

  return (
    <div
      id={`food-card-${item.id}`}
      className="group relative flex flex-col bg-white rounded-3xl border border-stone-200/80 shadow-xs card-hover-lift overflow-hidden transition-all duration-300"
    >
      {/* Top Image Container */}
      <div
        className="relative w-full h-52 sm:h-56 bg-stone-100 overflow-hidden cursor-pointer"
        onClick={handleOpenDetail}
        title="Click to view ingredients & customizations"
      >
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-200/80 animate-pulse" />
        )}
        <img
          src={imgSrc}
          alt={item.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          className={`w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Category & Dietary Pill Tag Overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-xs border border-white/60">
            <DietaryBadge type={item.dietary} showText={true} size="sm" />
          </div>
          <span className="glass-surface-dark text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xs tracking-wide">
            {item.category}
          </span>
        </div>

        {/* Favorite & Popular Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {item.isPopular && (
            <span className="inline-flex items-center gap-1 bg-linear-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md shadow-orange-500/30">
              <Flame className="w-3 h-3 fill-current" />
              Popular
            </span>
          )}

          <button
            id={`fav-btn-${item.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(item.id);
            }}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-md backdrop-blur-xs transition-all active:scale-90 cursor-pointer"
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
            aria-label="Toggle favorite"
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                favorited ? 'fill-rose-500 text-rose-500 scale-110' : 'text-stone-700'
              }`}
            />
          </button>
        </div>

        {/* Bottom image gradient for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-t from-stone-950/60 via-stone-950/20 to-transparent pointer-events-none" />

        {/* Delivery time and spice level floating chips */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border border-white/20 drop-shadow-sm">
            <Clock className="w-3.5 h-3.5 text-amber-300" />
            <span>{item.deliveryTime}</span>
          </div>

          {(item.spicyLevel || 0) > 0 && (
            <div className="flex items-center gap-0.5 bg-black/45 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-lg border border-white/20">
              <span>{'🌶️'.repeat(item.spicyLevel || 1)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 bg-white">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3
            id={`food-name-${item.id}`}
            onClick={handleOpenDetail}
            className="text-base sm:text-lg font-extrabold text-stone-900 font-display group-hover:text-orange-600 transition-colors line-clamp-1 tracking-tight cursor-pointer"
            title={item.name}
          >
            {item.name}
          </h3>

          <div className="flex items-center gap-1 bg-amber-50/90 border border-amber-200/80 px-2 py-0.5 rounded-xl shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-black text-amber-900">{item.rating}</span>
            <span className="text-[10px] text-stone-500">({item.ratingCount})</span>
          </div>
        </div>

        {/* Description */}
        <p
          onClick={handleOpenDetail}
          className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed mb-3 flex-1 font-normal cursor-pointer"
        >
          {item.description}
        </p>

        {/* Customization link */}
        <button
          type="button"
          onClick={handleOpenDetail}
          className="self-start inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:text-orange-700 hover:underline mb-3 cursor-pointer"
        >
          <Info className="w-3 h-3" />
          <span>View Ingredients & Extras</span>
        </button>

        {/* Price & Add to Cart Section */}
        <div className="pt-3.5 border-t border-stone-100 mt-auto">
          <div className="flex items-baseline justify-between mb-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Price</span>
              <span
                id={`price-${item.id}`}
                className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight font-display"
              >
                ₹{item.price}
              </span>
            </div>
            {item.calories && (
              <span className="text-[11px] font-semibold text-stone-500 bg-stone-100/90 px-2 py-0.5 rounded-md border border-stone-200/60">
                {item.calories}
              </span>
            )}
          </div>

          {/* ADD TO CART or QUANTITY CONTROLLER */}
          <QuantityControl item={item} variant="card" />
        </div>
      </div>
    </div>
  );
};

