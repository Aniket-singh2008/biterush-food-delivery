import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, ChefHat, Sparkles, X, ArrowRight, Printer } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderConfirmationModal: React.FC = () => {
  const { lastConfirmedOrder, setLastConfirmedOrder, isOrderTrackingOpen, setIsOrderTrackingOpen } = useCart();

  if (!lastConfirmedOrder || !isOrderTrackingOpen) return null;

  const handleClose = () => {
    setIsOrderTrackingOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="order-confirmation-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Animated Confetti Particles Backdrop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-70 animate-ping"
            style={{
              top: `${Math.sin(i) * 40 + 50}%`,
              left: `${(i * 5) % 100}%`,
              width: `${(i % 3) * 6 + 6}px`,
              height: `${(i % 3) * 6 + 6}px`,
              backgroundColor: ['#f97316', '#eab308', '#ef4444', '#10b981', '#3b82f6'][i % 5],
              animationDuration: `${2 + (i % 3)}s`,
              animationDelay: `${(i * 0.2)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6 z-10 animate-scale">
        {/* Top Celebration Banner */}
        <div className="bg-linear-to-r from-orange-600 via-amber-600 to-red-600 p-6 sm:p-8 text-center text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <h2 id="confirmation-heading" className="text-2xl sm:text-3xl font-black font-display tracking-tight mb-1">
            Order Confirmed! 🎉
          </h2>

          <p id="confirmation-subheading" className="text-orange-100 text-sm sm:text-base font-medium">
            Your delicious food is being prepared.
          </p>

          <div className="inline-flex items-center gap-2 mt-4 bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold">
            <span>Order ID:</span>
            <span id="demo-order-id" className="font-mono text-amber-200 tracking-wider">
              {lastConfirmedOrder.orderId}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Estimated Delivery Box */}
          <div className="bg-orange-50 border border-orange-200/80 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 block">
                  Estimated Delivery
                </span>
                <span id="estimated-delivery-time" className="text-lg font-black text-stone-900 font-display">
                  {lastConfirmedOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-medium text-stone-500 block">Ordered At</span>
              <span className="text-xs font-bold text-stone-800">{lastConfirmedOrder.orderTime}</span>
            </div>
          </div>

          {/* Live Order Status Steps */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
              <ChefHat className="w-3.5 h-3.5 text-orange-600" />
              <span>Live Kitchen Tracker</span>
            </h4>

            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-1 shadow-xs">
                  ✓
                </div>
                <span className="text-[11px] font-bold text-stone-900">Received</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold mb-1 animate-pulse shadow-xs">
                  🔥
                </div>
                <span className="text-[11px] font-bold text-orange-600">Preparing</span>
              </div>

              <div className="flex flex-col items-center text-center opacity-50">
                <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-bold mb-1">
                  🛵
                </div>
                <span className="text-[11px] font-medium text-stone-600">On Way</span>
              </div>

              <div className="flex flex-col items-center text-center opacity-50">
                <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center text-xs font-bold mb-1">
                  🏠
                </div>
                <span className="text-[11px] font-medium text-stone-600">Delivered</span>
              </div>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-600 space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-900 block">Deliver to: {lastConfirmedOrder.customerName}</span>
                <p className="text-stone-600 mt-0.5">{lastConfirmedOrder.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span>Contact: {lastConfirmedOrder.phoneNumber}</span>
              <span className="text-stone-300">•</span>
              <span className="font-semibold text-stone-800">{lastConfirmedOrder.paymentMethod}</span>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-700">
              <span>Items Ordered ({lastConfirmedOrder.items.length})</span>
              <span>Paid: ₹{lastConfirmedOrder.totalAmount}</span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 divide-y divide-stone-100 text-xs">
              {lastConfirmedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between pt-1">
                  <span className="text-stone-800 font-medium">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-bold text-stone-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Price breakdown including GST */}
            <div className="pt-2 border-t border-stone-200 space-y-1 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>₹{lastConfirmedOrder.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{lastConfirmedOrder.deliveryFee === 0 ? 'FREE' : `₹${lastConfirmedOrder.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Govt. Taxes (GST 5%)</span>
                <span>₹{lastConfirmedOrder.gst}</span>
              </div>
              {lastConfirmedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount</span>
                  <span>-₹{lastConfirmedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-stone-900 pt-1.5 border-t border-stone-200">
                <span>Total Amount Paid</span>
                <span className="text-orange-600 font-display">₹{lastConfirmedOrder.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Buttons: Back to Menu / Order More */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-4 py-3 border border-stone-200 hover:bg-stone-100 rounded-xl text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print receipt"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Receipt</span>
            </button>

            <button
              id="order-more-btn"
              onClick={handleClose}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm font-bold rounded-xl shadow-md active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Order More Delicious Food</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
