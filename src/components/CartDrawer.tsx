import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DietaryBadge } from './DietaryBadge';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    gst,
    discount,
    totalAmount,
    totalItemsCount,
    appliedPromo,
    applyPromo,
    removePromo,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyPromo(promoInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Free delivery threshold is ₹400
  const freeDeliveryThreshold = 400;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-stone-200">
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-stone-900 font-display leading-tight">
                  Your Food Cart
                </h2>
                <span className="text-xs text-stone-500">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1 cursor-pointer"
                  title="Clear all cart items"
                >
                  Clear All
                </button>
              )}
              <button
                id="close-cart-drawer"
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Bar */}
          {cart.length > 0 && (
            <div className="px-4 py-2.5 bg-orange-50/60 border-b border-orange-100">
              {amountNeededForFreeDelivery > 0 && deliveryFee > 0 ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-orange-900 mb-1">
                    <span>Add ₹{amountNeededForFreeDelivery} more for Free Delivery!</span>
                    <span>{Math.round(freeDeliveryPercent)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-orange-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-orange-500 to-amber-500 transition-all duration-300"
                      style={{ width: `${freeDeliveryPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Yay! You’ve unlocked FREE Delivery! 🎉</span>
                </div>
              )}
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 rounded-full bg-orange-100/70 flex items-center justify-center text-orange-500 mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-display mb-1">
                  Your Cart is Empty
                </h3>
                <p className="text-sm text-stone-500 max-w-xs mb-6">
                  Looks like you haven't added any delicious Italian or Asian meals yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md cursor-pointer"
                >
                  Explore Dishes Now
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="flex gap-3.5 p-3 rounded-2xl bg-stone-50/70 border border-stone-200/80 hover:border-orange-200 transition-colors"
                >
                  {/* Food Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-stone-200"
                  />

                  {/* Info and controls */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <DietaryBadge type={item.dietary} size="sm" />
                          <h4 className="text-sm font-bold text-stone-900 line-clamp-1 font-display">
                            {item.name}
                          </h4>
                        </div>
                        <p className="text-xs text-stone-500">
                          ₹{item.price} each
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                        title={`Remove ${item.name}`}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity controls & Item Subtotal */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="inline-flex items-center bg-white border border-stone-200 rounded-lg p-0.5 shadow-2xs">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-md text-stone-700 hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-pointer font-bold"
                          aria-label={`Decrease ${item.name}`}
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-xs font-black text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-colors cursor-pointer font-bold"
                          aria-label={`Increase ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-stone-400 block leading-none">Total</span>
                        <span className="text-sm font-black text-stone-900">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50/80 space-y-4">
              {/* Promo Code Input */}
              <div className="space-y-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. BITERUSH50)"
                      className="w-full pl-9 pr-3 py-2 text-xs uppercase font-bold bg-white border border-stone-200 rounded-xl outline-hidden focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Quick-Apply Promo Pills */}
                {!appliedPromo && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Try:</span>
                    {['BITERUSH50', 'COLLEGEFEST', 'FREEBIE'].map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          const res = applyPromo(code);
                          setPromoMessage({ text: res.message, isError: !res.success });
                        }}
                        className="text-[10px] font-mono font-bold bg-orange-100/70 hover:bg-orange-200/80 text-orange-900 border border-orange-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                      >
                        +{code}
                      </button>
                    ))}
                  </div>
                )}

                {promoMessage && (
                  <p
                    className={`text-[11px] font-semibold ${
                      promoMessage.isError ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1.5 rounded-lg">
                    <span className="font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      {appliedPromo.code} applied
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-[11px] text-emerald-900 underline hover:text-rose-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs sm:text-sm text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">₹{subtotal}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1">
                    <span>Delivery Fee</span>
                    {deliveryFee === 0 && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-sm">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-stone-900">
                    {deliveryFee === 0 ? '₹0' : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between items-center text-stone-600">
                  <span>Govt. Taxes (GST 5%)</span>
                  <span id="cart-gst-amount" className="font-bold text-stone-900">
                    ₹{gst}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Promo Discount</span>
                    <span className="font-bold">-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t border-stone-200 text-base font-extrabold text-stone-900">
                  <span>Total Amount</span>
                  <span id="cart-total-amount" className="text-xl text-orange-600 font-display">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Safe & Secure Checkout • Demo Competition Mode</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
