import React, { useState } from 'react';
import { Tag, Sparkles, Check, ArrowRight } from 'lucide-react';
import { SPECIAL_OFFERS } from '../data/extraSections';
import { useCart } from '../context/CartContext';

export const SpecialOffers: React.FC = () => {
  const { applyPromo, setIsCartOpen, appliedPromo } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApplyOffer = (code: string) => {
    const res = applyPromo(code);
    setCopiedCode(code);
    setFeedbackMsg({ text: res.message, isError: !res.success });

    setTimeout(() => {
      setCopiedCode(null);
      setFeedbackMsg(null);
    }, 3500);

    // If successfully applied, open cart so they see the discount
    if (res.success) {
      setIsCartOpen(true);
    }
  };

  return (
    <section id="special-offers" className="py-12 sm:py-16 bg-stone-50/70 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Deals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-stone-900 tracking-tight mb-3">
            Save Big On Every Bite
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Apply these limited-time coupons at checkout to enjoy mouth-watering discounts on your favorite dishes.
          </p>
          {feedbackMsg && (
            <div
              className={`mt-3 inline-block text-xs font-semibold px-4 py-1.5 rounded-full shadow-md animate-bounce-gentle ${
                feedbackMsg.isError
                  ? 'bg-rose-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              {feedbackMsg.text}
            </div>
          )}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_OFFERS.map((offer) => {
            const isApplied = appliedPromo?.code === offer.code;

            return (
              <div
                key={offer.id}
                id={`offer-card-${offer.id}`}
                className="relative flex flex-col bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs card-hover-lift transition-all duration-300"
              >
                {/* Top Banner with color gradient */}
                <div className={`p-6 sm:p-7 bg-linear-to-r ${offer.bgGradient} text-white relative overflow-hidden`}>
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/15 rounded-full blur-xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-black uppercase tracking-wider bg-black/25 backdrop-blur-xs px-3 py-1 rounded-full border border-white/20">
                      {offer.badge}
                    </span>
                    <span className="text-xs font-bold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-lg border border-white/20">
                      {offer.cuisine}
                    </span>
                  </div>

                  <p className="text-3xl sm:text-4xl font-black font-display tracking-tight leading-none mb-1.5 drop-shadow-xs">
                    {offer.discountText}
                  </p>
                  <h3 className="text-base font-bold text-white/95">
                    {offer.title}
                  </h3>
                </div>

                {/* Offer Details & Apply button */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                  <p className="text-xs sm:text-sm text-stone-600 mb-5 leading-relaxed font-normal">
                    {offer.tagline}
                  </p>

                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-dashed border-stone-200">
                    <div className="flex items-center gap-2 bg-stone-100/90 px-3.5 py-2 rounded-xl border border-stone-200/90">
                      <Tag className="w-3.5 h-3.5 text-stone-500" />
                      <span className="font-mono text-xs sm:text-sm font-black text-stone-800 tracking-wider">
                        {offer.code}
                      </span>
                    </div>

                    <button
                      id={`apply-code-${offer.code.toLowerCase()}`}
                      onClick={() => handleApplyOffer(offer.code)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                        isApplied
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/20'
                          : 'bg-stone-900 hover:bg-orange-600 text-white shadow-sm hover:shadow-md'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <span>Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
