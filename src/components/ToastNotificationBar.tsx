import React from 'react';
import { CheckCircle, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotificationBar: React.FC = () => {
  const { activeToast, hideToast, setIsCartOpen } = useCart();

  if (!activeToast) return null;

  return (
    <div
      id="toast-notification"
      className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slide-up pointer-events-auto"
    >
      <div className="flex items-center gap-3 bg-stone-900/95 backdrop-blur-md text-white pl-3.5 pr-2.5 py-2.5 rounded-2xl shadow-2xl border border-stone-700/80 max-w-md">
        {activeToast.image ? (
          <img
            src={activeToast.image}
            alt={activeToast.title}
            className="w-10 h-10 rounded-xl object-cover border border-stone-700 shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
        )}

        <div className="pr-2">
          <p className="text-xs font-bold text-stone-100">{activeToast.title}</p>
          <p className="text-[11px] text-stone-400">{activeToast.message}</p>
        </div>

        <button
          onClick={() => {
            hideToast();
            setIsCartOpen(true);
          }}
          className="inline-flex items-center gap-1 text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white px-2.5 py-1.5 rounded-xl transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Cart</span>
        </button>

        <button
          onClick={hideToast}
          className="p-1 text-stone-400 hover:text-stone-200 rounded-lg cursor-pointer"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
