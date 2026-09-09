import React, { useState, useEffect } from 'react';
import { X, Flame, Clock, ChefHat, Sparkles, Check, Plus, Minus, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DietaryBadge } from './DietaryBadge';
import { FoodCustomization } from '../types';

export const FoodDetailModal: React.FC = () => {
  const { selectedDish, setSelectedDish, addToCart, cart, increaseQuantity, decreaseQuantity, isFavorite, toggleFavorite } = useCart();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Reset addons when dish changes
  useEffect(() => {
    setSelectedAddons([]);
  }, [selectedDish]);

  if (!selectedDish) return null;

  const handleClose = () => {
    setSelectedDish(null);
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // Find if already in cart
  const cartItem = cart.find((i) => i.id === selectedDish.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // Calculate customized price
  const addonsTotal = (selectedDish.customizations || [])
    .filter((c) => selectedAddons.includes(c.id))
    .reduce((sum, c) => sum + c.price, 0);

  const finalUnitPrice = selectedDish.price + addonsTotal;

  const handleAddToCart = () => {
    addToCart(selectedDish);
  };

  const favorited = isFavorite(selectedDish.id);

  return (
    <div
      id="food-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden my-6 z-10 animate-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image Hero with Floating Controls */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
          <img
            src={selectedDish.image}
            alt={selectedDish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            id="close-food-detail-btn"
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-900 flex items-center justify-center shadow-md backdrop-blur-xs transition-colors cursor-pointer"
            aria-label="Close dish details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite Button */}
          <button
            id={`fav-btn-modal-${selectedDish.id}`}
            onClick={() => toggleFavorite(selectedDish.id)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md backdrop-blur-xs transition-colors cursor-pointer"
            aria-label="Toggle favorite"
          >
            <Heart
              className={`w-5 h-5 transition-transform active:scale-125 ${
                favorited ? 'fill-rose-500 text-rose-500' : 'text-stone-700'
              }`}
            />
          </button>

          {/* Dish Badges over Image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <DietaryBadge dietary={selectedDish.dietary} size="md" />
                <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/90 text-stone-900 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                  {selectedDish.category}
                </span>
                {selectedDish.isPopular && (
                  <span className="text-[11px] font-extrabold bg-linear-to-r from-amber-500 to-orange-500 text-white px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    Popular
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight drop-shadow-md">
                {selectedDish.name}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-xs text-stone-300 block font-medium">Starting at</span>
              <span className="text-2xl font-black text-amber-400 font-display">
                ₹{selectedDish.price}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[calc(85vh-18rem)] overflow-y-auto">
          {/* Quick Metrics (Delivery, Calories, Spice Level) */}
          <div className="grid grid-cols-3 gap-2.5 py-3 px-4 bg-stone-50/90 rounded-2xl border border-stone-200/70 text-center">
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1 text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                <Clock className="w-3.5 h-3.5 text-orange-500" />
                Time
              </span>
              <span className="text-xs sm:text-sm font-black text-stone-900 mt-0.5">
                {selectedDish.deliveryTime}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center border-x border-stone-200">
              <span className="flex items-center gap-1 text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Calories
              </span>
              <span className="text-xs sm:text-sm font-black text-stone-900 mt-0.5">
                {selectedDish.calories || '450 kcal'}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-1 text-[11px] font-bold text-stone-500 uppercase tracking-wide">
                <Flame className="w-3.5 h-3.5 text-red-500" />
                Spice Level
              </span>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs ${
                      i < (selectedDish.spicyLevel || 0)
                        ? 'opacity-100'
                        : 'opacity-20 grayscale'
                    }`}
                  >
                    🌶️
                  </span>
                ))}
                {(selectedDish.spicyLevel || 0) === 0 && (
                  <span className="text-xs font-bold text-emerald-600">Mild</span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1.5">
              About This Dish
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed font-normal">
              {selectedDish.description}
            </p>
          </div>

          {/* Ingredients list */}
          {selectedDish.ingredients && selectedDish.ingredients.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                Fresh Ingredients
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedDish.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200/80 px-2.5 py-1 rounded-lg"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Chef's Note */}
          {selectedDish.chefNote && (
            <div className="bg-linear-to-r from-orange-50 to-amber-50/60 p-4 rounded-2xl border border-orange-200/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 shrink-0 mt-0.5">
                <ChefHat className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-orange-900 uppercase tracking-wider mb-0.5">
                  Chef's Secret Note
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed italic">
                  &ldquo;{selectedDish.chefNote}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Customization Options */}
          {selectedDish.customizations && selectedDish.customizations.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Popular Add-ons & Extras
                </h3>
                <span className="text-[11px] font-semibold text-stone-500">Optional</span>
              </div>
              <div className="space-y-2">
                {selectedDish.customizations.map((addon: FoodCustomization) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-orange-50/70 border-orange-300 shadow-2xs'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-orange-600 border-orange-600 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-stone-800">
                          {addon.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        +₹{addon.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer / Action Bar */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/90 flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] text-stone-500 block font-medium">Total Item Price</span>
            <span className="text-xl sm:text-2xl font-black text-stone-900 font-display">
              ₹{finalUnitPrice}
            </span>
          </div>

          {quantityInCart === 0 ? (
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md shadow-orange-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>ADD TO CART</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-stone-900 text-white px-3 py-1.5 rounded-2xl shadow-md">
              <button
                onClick={() => decreaseQuantity(selectedDish.id)}
                className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 flex items-center justify-center active:scale-90 transition-all cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 stroke-[2.5]" />
              </button>
              <span className="font-display font-black text-base px-2">
                {quantityInCart}
              </span>
              <button
                onClick={() => increaseQuantity(selectedDish.id)}
                className="w-8 h-8 rounded-xl bg-orange-600 hover:bg-orange-500 flex items-center justify-center active:scale-90 transition-all cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
