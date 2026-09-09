import React from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { FoodItem } from '../types';
import { useCart } from '../context/CartContext';

interface QuantityControlProps {
  item: FoodItem;
  variant?: 'card' | 'compact' | 'full';
  className?: string;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  item,
  variant = 'card',
  className = '',
}) => {
  const { getItemQuantity, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const quantity = getItemQuantity(item.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    increaseQuantity(item.id);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    decreaseQuantity(item.id);
  };

  // State 1: When quantity is 0, show "ADD TO CART"
  if (quantity === 0) {
    if (variant === 'compact') {
      return (
        <button
          id={`add-btn-${item.id}`}
          onClick={handleAdd}
          className={`flex items-center justify-center gap-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm transition-all duration-150 cursor-pointer ${className}`}
          aria-label={`Add ${item.name} to cart`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>ADD</span>
        </button>
      );
    }

    return (
      <button
        id={`add-btn-${item.id}`}
        onClick={handleAdd}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-[0.98] text-white text-sm font-bold tracking-wide rounded-xl shadow-md hover:shadow-orange-500/25 transition-all duration-200 cursor-pointer ${className}`}
        aria-label={`Add ${item.name} to cart`}
      >
        <ShoppingBag className="w-4 h-4" />
        <span>ADD TO CART</span>
      </button>
    );
  }

  // State 2: When quantity > 0, show [ − ]  qty  [ + ]
  if (variant === 'compact') {
    return (
      <div
        id={`qty-ctrl-${item.id}`}
        className={`inline-flex items-center bg-orange-50 border border-orange-200 rounded-lg p-0.5 shadow-xs ${className}`}
      >
        <button
          id={`qty-decrease-${item.id}`}
          onClick={handleDecrease}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-orange-700 hover:bg-orange-600 hover:text-white transition-colors cursor-pointer"
          aria-label={`Decrease quantity of ${item.name}`}
        >
          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
        <span
          id={`qty-display-${item.id}`}
          className="w-7 text-center text-xs font-bold text-orange-950 select-none"
        >
          {quantity}
        </span>
        <button
          id={`qty-increase-${item.id}`}
          onClick={handleIncrease}
          className="w-7 h-7 flex items-center justify-center rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-colors cursor-pointer"
          aria-label={`Increase quantity of ${item.name}`}
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    );
  }

  return (
    <div
      id={`qty-ctrl-${item.id}`}
      className={`w-full flex items-center justify-between bg-orange-50/90 border border-orange-300/80 rounded-xl p-1 shadow-sm ${className}`}
    >
      <button
        id={`qty-decrease-${item.id}`}
        onClick={handleDecrease}
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-white text-orange-700 shadow-xs hover:bg-orange-600 hover:text-white active:scale-95 transition-all duration-150 cursor-pointer"
        aria-label={`Decrease quantity of ${item.name}`}
      >
        <Minus className="w-4 h-4 stroke-[2.5]" />
      </button>

      <div className="flex flex-col items-center select-none">
        <span
          id={`qty-display-${item.id}`}
          className="text-base font-extrabold text-orange-950 leading-none"
        >
          {quantity}
        </span>
        <span className="text-[10px] font-medium text-orange-600 uppercase tracking-wider">
          in cart
        </span>
      </div>

      <button
        id={`qty-increase-${item.id}`}
        onClick={handleIncrease}
        className="w-9 h-9 flex items-center justify-center rounded-lg bg-orange-600 text-white shadow-xs hover:bg-orange-700 active:scale-95 transition-all duration-150 cursor-pointer"
        aria-label={`Increase quantity of ${item.name}`}
      >
        <Plus className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
};
