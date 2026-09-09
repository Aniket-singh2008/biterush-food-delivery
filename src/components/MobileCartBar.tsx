import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const MobileCartBar: React.FC = () => {
  const { totalItemsCount, totalAmount, setIsCartOpen, isCartOpen, isCheckoutOpen } = useCart();

  if (totalItemsCount === 0 || isCartOpen || isCheckoutOpen) return null;

  return (
    <div
      id="mobile-sticky-cart"
      className="fixed bottom-4 inset-x-4 z-40 md:hidden animate-fade-in"
    >
      <button
        onClick={() => setIsCartOpen(true)}
        className="w-full bg-linear-to-r from-orange-600 via-amber-600 to-red-600 text-white p-3.5 rounded-2xl shadow-xl shadow-orange-950/20 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-black">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-orange-100 leading-tight">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in Cart
            </p>
            <p className="text-base font-black font-display text-white">
              Total: ₹{totalAmount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white text-orange-700 px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs">
          <span>View Cart</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
