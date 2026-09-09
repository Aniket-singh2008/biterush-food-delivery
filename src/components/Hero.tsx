import React from 'react';
import { Search, ArrowRight, Sparkles, Flame, Clock, Star, ShieldCheck } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onBrowseMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  onBrowseMenu,
}) => {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onBrowseMenu();
  };

  const quickTags = [
    { label: 'Margherita', icon: '🍕' },
    { label: 'Ramen', icon: '🍜' },
    { label: 'Alfredo', icon: '🍝' },
    { label: 'Hakka Noodles', icon: '🥢' },
    { label: 'Sushi', icon: '🍣' },
    { label: 'Tiramisu', icon: '🍰' },
  ];

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-8 pb-14 md:py-16 lg:py-20 bg-linear-to-b from-orange-50/80 via-[#FFFDF9] to-[#FFFDF9]"
    >
      {/* Subtle decorative background ambient glow */}
      <div className="absolute -top-32 -left-24 w-[420px] h-[420px] bg-orange-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[380px] h-[380px] bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-red-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Heading, Subheading, Search & CTA */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2.5 self-start bg-orange-100/90 border border-orange-200/80 text-orange-900 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-5 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600" />
              </span>
              <span>Authentic Italian & Asian Kitchens</span>
              <span className="text-orange-300">•</span>
              <span className="text-orange-700 font-medium hidden sm:inline">25–35 Min Express Delivery</span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black font-display text-stone-900 tracking-tight leading-[1.08] mb-5"
            >
              Craving Something{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-600 via-amber-600 to-red-600 drop-shadow-xs">
                Delicious?
              </span>
            </h1>

            {/* Subheading */}
            <p
              id="hero-subheading"
              className="text-base sm:text-lg md:text-xl text-stone-600 max-w-2xl font-normal leading-relaxed mb-8"
            >
              Discover the best Italian wood-fired pizzas and vibrant Asian wok delicacies, freshly prepared and delivered hot to your doorstep.
            </p>

            {/* Premium Search Food Input Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-xl w-full mb-4 group"
              id="hero-search-form"
            >
              <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-2.5 border border-stone-200 shadow-xl shadow-orange-950/5 focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-500/15 transition-all duration-300">
                <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0 group-focus-within:text-orange-600 transition-colors" />
                <input
                  id="hero-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pizza, noodles, pasta, ramen, sushi..."
                  className="w-full px-3 py-2 text-stone-900 placeholder:text-stone-400 text-sm sm:text-base outline-hidden bg-transparent font-medium"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-semibold text-stone-400 hover:text-stone-600 px-2.5 py-1.5 rounded-lg hover:bg-stone-100 mr-1 transition-colors"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  id="hero-search-btn"
                  className="shrink-0 bg-linear-to-r from-orange-600 via-amber-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm shadow-md shadow-orange-600/25 hover:shadow-lg hover:shadow-orange-600/30 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Search</span>
                </button>
              </div>
            </form>

            {/* Popular quick-click chips */}
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-8">
              <span className="text-xs font-bold text-stone-500 mr-1 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" /> Popular:
              </span>
              {quickTags.map((tag) => (
                <button
                  key={tag.label}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag.label);
                    onBrowseMenu();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold bg-white hover:bg-orange-50 text-stone-700 hover:text-orange-700 border border-stone-200/90 hover:border-orange-300 px-3 py-1.5 rounded-xl shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <span>{tag.icon}</span>
                  <span>{tag.label}</span>
                </button>
              ))}
            </div>

            {/* Browse Menu & Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="browse-menu-btn"
                onClick={onBrowseMenu}
                className="flex items-center gap-2 bg-stone-900 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-stone-900/15 hover:shadow-orange-600/25 active:scale-95 transition-all duration-200 cursor-pointer group"
              >
                <span>Browse Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-3 sm:gap-4 py-2 text-xs sm:text-sm text-stone-600 font-semibold flex-wrap">
                <span className="flex items-center gap-1.5 bg-orange-50/80 text-orange-900 border border-orange-200/70 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-orange-600" /> 25–35 min
                </span>
                <span className="flex items-center gap-1.5 bg-amber-50/80 text-amber-900 border border-amber-200/70 px-3 py-1.5 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> 4.9 Rated
                </span>
                <span className="flex items-center gap-1.5 bg-emerald-50/80 text-emerald-900 border border-emerald-200/70 px-3 py-1.5 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Hygienic
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase with Hero Images & Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Showcase Card */}
              <div className="relative z-10 rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-orange-950/15 bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80"
                  alt="Fresh artisanal Italian pizza and Asian dishes"
                  className="w-full h-84 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/75 via-stone-950/20 to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-block bg-orange-600 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      Chef’s Signature
                    </span>
                    <span className="text-xs text-white/90 font-medium">Italian & Asian Kitchen</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold font-display leading-snug">
                    Wood-fired Sourdough Pizza & Wok-tossed Ramen
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Top Rated (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-stone-900/10 z-20 flex items-center gap-3 animate-float">
                <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-amber-100 to-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-stone-900 font-display">4.9 / 5.0</span>
                    <span className="text-[10px] text-amber-600 font-bold">Top Rated</span>
                  </div>
                  <p className="text-[11px] font-medium text-stone-500">Over 1,200+ foodie reviews</p>
                </div>
              </div>

              {/* Floating Badge 2: Delivery Speed (Bottom Right) */}
              <div className="absolute -bottom-5 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-stone-900/10 z-20 flex items-center gap-3 animate-float-delayed">
                <div className="w-11 h-11 rounded-xl bg-linear-to-tr from-orange-100 to-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shadow-2xs">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-black text-stone-900 font-display">25–35 Mins</p>
                  <p className="text-[11px] font-bold text-emerald-600">Express Campus Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
