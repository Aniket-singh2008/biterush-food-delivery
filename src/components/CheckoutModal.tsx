import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Banknote, MapPin, User, Phone, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { OrderDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    deliveryFee,
    gst,
    discount,
    totalAmount,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    setLastConfirmedOrder,
    setIsOrderTrackingOpen,
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'Online Payment (Demo)'>(
    'Cash on Delivery'
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  if (cart.length === 0) {
    return (
      <div
        className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-stone-200 p-6 text-center animate-scale">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-display text-stone-900 mb-2">
            Your Cart is Empty
          </h3>
          <p className="text-sm text-stone-600 mb-6">
            Please select some delicious Italian or Asian meals before checking out.
          </p>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-full py-3 bg-stone-900 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer"
          >
            Explore Menu Dishes
          </button>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your full name';
    if (!phone.trim()) {
      errs.phone = 'Please enter your phone number';
    } else if (!/^[0-9+\s-]{10,14}$/.test(phone.trim())) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!address.trim()) errs.address = 'Please provide your delivery address';
    else if (address.trim().length < 10) errs.address = 'Address is too short (min 10 characters)';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (cart.length === 0) return;

    setIsSubmitting(true);

    // Simulate order placement delay for professional feel
    setTimeout(() => {
      // Generate demo order ID like #BR-84920
      const demoOrderId = `#BR-${Math.floor(10000 + Math.random() * 90000)}`;

      const orderData: OrderDetails = {
        orderId: demoOrderId,
        customerName: name.trim(),
        phoneNumber: phone.trim(),
        address: address.trim(),
        paymentMethod,
        items: [...cart],
        subtotal,
        deliveryFee,
        gst,
        discount,
        totalAmount,
        orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedDelivery: '25–35 minutes',
      };

      setLastConfirmedOrder(orderData);
      setIsOrderTrackingOpen(true);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-200 bg-stone-50/80">
          <div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-stone-900">
              Complete Your Order
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Provide delivery details to receive freshly prepared hot food
            </p>
          </div>

          <button
            id="close-checkout-modal"
            onClick={() => setIsCheckoutOpen(false)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Content */}
        <form onSubmit={handlePlaceOrder} className="p-5 sm:p-6 space-y-6">
          {/* Customer Details Form */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <User className="w-4 h-4 text-orange-600" />
              <span>Customer Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Customer Name <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="checkout-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aniket Singh"
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border rounded-xl outline-hidden focus:bg-white focus:ring-2 ${
                      errors.name
                        ? 'border-rose-300 focus:ring-rose-200'
                        : 'border-stone-200 focus:ring-orange-500/20 focus:border-orange-500'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Phone Number <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border rounded-xl outline-hidden focus:bg-white focus:ring-2 ${
                      errors.phone
                        ? 'border-rose-300 focus:ring-rose-200'
                        : 'border-stone-200 focus:ring-orange-500/20 focus:border-orange-500'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Delivery Address <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <textarea
                  id="checkout-address"
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Hostel Room / House No., Floor, Landmark, Campus Block..."
                  className={`w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border rounded-xl outline-hidden focus:bg-white focus:ring-2 resize-none ${
                    errors.address
                      ? 'border-rose-300 focus:ring-rose-200'
                      : 'border-stone-200 focus:ring-orange-500/20 focus:border-orange-500'
                  }`}
                />
              </div>
              {errors.address && <p className="text-xs text-rose-600 mt-1">{errors.address}</p>}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-orange-600" />
              <span>Payment Method</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Cash on Delivery */}
              <label
                id="payment-method-cod"
                className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={() => setPaymentMethod('Cash on Delivery')}
                  className="mt-1 text-orange-600 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>Cash on Delivery</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Pay with cash or UPI QR scanner upon delivery
                  </p>
                </div>
              </label>

              {/* Online Payment Demo */}
              <label
                id="payment-method-online"
                className={`flex items-start gap-3 p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'Online Payment (Demo)'
                    ? 'border-orange-500 bg-orange-50/60 shadow-xs'
                    : 'border-stone-200 bg-stone-50/50 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online Payment (Demo)"
                  checked={paymentMethod === 'Online Payment (Demo)'}
                  onChange={() => setPaymentMethod('Online Payment (Demo)')}
                  className="mt-1 text-orange-600 focus:ring-orange-500"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900 text-sm">
                    <CreditCard className="w-4 h-4 text-orange-600" />
                    <span>Online Payment (Demo)</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Simulated Instant UPI / Credit / Debit Card
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" /> Order Summary ({cart.length} items)
              </span>
              <span className="text-stone-400 font-normal">Est. 25–35 mins</span>
            </h4>

            <div className="max-h-36 overflow-y-auto space-y-2 pr-1 text-xs mb-3 divide-y divide-stone-200/60">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center pt-2">
                  <span className="text-stone-800 font-medium line-clamp-1">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-bold text-stone-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Govt. Taxes (GST 5%)</span>
                <span id="checkout-gst-amount">₹{gst}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Amount</span>
                <span id="checkout-total-amount" className="text-lg text-orange-600 font-display">
                  ₹{totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="space-y-3">
            <button
              id="place-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-linear-to-r from-orange-600 via-amber-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black text-base rounded-xl shadow-lg shadow-orange-500/25 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Preparing Order...</span>
                </span>
              ) : (
                <>
                  <span>Place Order • ₹{totalAmount}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>BiteRush Guarantee: Freshly prepared & sealed hygiene pack</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
