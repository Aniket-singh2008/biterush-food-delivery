import React, { useState, useEffect } from 'react';
import { ShoppingBag, UtensilsCrossed, Menu as MenuIcon, X, Search, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onSearchClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-surface-warm shadow-md shadow-orange-950/5 border-b border-orange-200/50 py-2.5'
          : 'bg-[#FFFDF9]/90 backdrop-blur-md py-3.5 border-b border-stone-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* BiteRush Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            id="brand-logo"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-linear-to-tr from-orange-600 via-amber-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              <div className="absolute -inset-0.5 rounded-2xl bg-orange-500/20 blur-xs -z-10 group-hover:blur-sm transition-all" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-stone-900 leading-none">
                Bite<span className="text-orange-600">Rush</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-stone-500 flex items-center gap-1 mt-0.5">
                Italian & Asian <Sparkles className="w-2.5 h-2.5 text-amber-500 inline" />
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 bg-stone-100/80 p-1 rounded-2xl border border-stone-200/60">
            <button
              id="nav-home"
              onClick={() => scrollToSection('hero')}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-bold text-stone-700 hover:text-orange-600 rounded-xl hover:bg-white hover:shadow-xs transition-all cursor-pointer"
            >
              Home
            </button>
            <button
              id="nav-italian"
              onClick={() => scrollToSection('italian-section')}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-bold text-stone-700 hover:text-orange-600 rounded-xl hover:bg-white hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🍕</span> Italian
            </button>
            <button
              id="nav-asian"
              onClick={() => scrollToSection('asian-section')}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-bold text-stone-700 hover:text-orange-600 rounded-xl hover:bg-white hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🍜</span> Asian
            </button>
            <button
              id="nav-menu"
              onClick={() => scrollToSection('full-menu')}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-bold text-stone-700 hover:text-orange-600 rounded-xl hover:bg-white hover:shadow-xs transition-all cursor-pointer"
            >
              Menu
            </button>
            <button
              id="nav-offers"
              onClick={() => scrollToSection('special-offers')}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-bold text-amber-700 hover:text-orange-600 rounded-xl hover:bg-amber-100/70 hover:shadow-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <span>🎁</span> Offers
            </button>
          </nav>

          {/* Right Action Icons: Search trigger & Cart Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search trigger button */}
            <button
              id="nav-search-btn"
              onClick={() => {
                if (onSearchClick) onSearchClick();
                else scrollToSection('full-menu');
              }}
              className="p-2.5 text-stone-600 hover:text-orange-600 hover:bg-orange-50/70 rounded-xl border border-transparent hover:border-orange-200 transition-all cursor-pointer"
              aria-label="Search food items"
              title="Search food items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button with Live Badge */}
            <button
              id="cart-icon-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label={`Open shopping cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span className="hidden sm:inline text-xs sm:text-sm font-bold tracking-wide">Cart</span>

              {/* Cart Count Badge */}
              {totalItemsCount > 0 && (
                <span
                  id="cart-item-count-badge"
                  className="w-5 h-5 flex items-center justify-center bg-white text-orange-700 text-xs font-black rounded-full shadow-sm animate-scale"
                >
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-stone-700 md:hidden hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden border-t border-stone-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl animate-fade-in"
        >
          <div className="flex flex-col gap-1">
            <button
              id="mobile-nav-home"
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-stone-800 hover:bg-orange-50 rounded-xl text-left"
            >
              🏠 Home
            </button>
            <button
              id="mobile-nav-italian"
              onClick={() => scrollToSection('italian-section')}
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-stone-800 hover:bg-orange-50 rounded-xl text-left"
            >
              🍕 Italian Flavours
            </button>
            <button
              id="mobile-nav-asian"
              onClick={() => scrollToSection('asian-section')}
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-stone-800 hover:bg-orange-50 rounded-xl text-left"
            >
              🍜 Asian Delicacies
            </button>
            <button
              id="mobile-nav-menu"
              onClick={() => scrollToSection('full-menu')}
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-stone-800 hover:bg-orange-50 rounded-xl text-left"
            >
              📋 Complete Menu
            </button>
            <button
              id="mobile-nav-offers"
              onClick={() => scrollToSection('special-offers')}
              className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-orange-700 bg-orange-50/60 rounded-xl text-left"
            >
              🎁 Special Offers & Coupons
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
