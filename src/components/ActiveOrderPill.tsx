import React from 'react';
import { Bike, ArrowRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ActiveOrderPill: React.FC = () => {
  const { lastConfirmedOrder, setIsOrderTrackingOpen, setLastConfirmedOrder } = useCart();

  if (!lastConfirmedOrder) return null;

  return (
    <div
      id="active-order-pill"
      className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 animate-slide-up"
    >
      <div className="flex items-center gap-3 bg-stone-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-700/80 hover:border-orange-500/50 transition-all">
        {/* Animated Bike Icon */}
        <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-sm animate-pulse">
          <Bike className="w-5 h-5" />
        </div>

        {/* Status Text */}
        <button
          onClick={() => setIsOrderTrackingOpen(true)}
          className="text-left cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-400">
              Live Order #{lastConfirmedOrder.orderId}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <p className="text-xs font-bold text-stone-200 group-hover:text-white flex items-center gap-1.5 mt-0.5">
            <span>In Kitchen • {lastConfirmedOrder.estimatedDelivery}</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-400 group-hover:translate-x-0.5 transition-transform" />
          </p>
        </button>

        {/* Dismiss Pill */}
        <button
          onClick={() => setLastConfirmedOrder(null)}
          className="p-1 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800 transition-colors ml-1 cursor-pointer"
          title="Dismiss active tracker"
          aria-label="Dismiss active tracker"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
