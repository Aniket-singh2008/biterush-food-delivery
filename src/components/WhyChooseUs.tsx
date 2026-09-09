import React from 'react';
import { Zap, ChefHat, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/extraSections';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-6 h-6 text-orange-600" />,
  ChefHat: <ChefHat className="w-6 h-6 text-amber-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-rose-600" />,
};

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-14 sm:py-20 bg-stone-50/60 border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/80 px-3.5 py-1 rounded-full mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The BiteRush Difference</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-stone-900 tracking-tight mb-3">
            Why Foodies Choose BiteRush
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            From farm-fresh artisanal herbs to authentic wok heat, we bring master-chef quality directly to your table.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-xs card-hover-lift flex flex-col transition-all duration-300"
            >
              <div className="w-13 h-13 rounded-2xl bg-linear-to-tr from-orange-100 to-amber-50 border border-orange-200/70 flex items-center justify-center mb-5 shadow-2xs">
                {iconMap[feature.icon]}
              </div>

              <div className="inline-block self-start text-[11px] font-extrabold text-orange-800 bg-orange-100/80 px-2.5 py-0.5 rounded-lg mb-3">
                {feature.stat}
              </div>

              <h3 className="text-lg font-extrabold text-stone-900 mb-2 font-display tracking-tight">
                {feature.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
