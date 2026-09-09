import React, { useState, useMemo, useRef } from 'react';
import { FOOD_ITEMS } from './data/foodItems';
import { FilterCategory } from './types';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { FoodCard } from './components/FoodCard';
import { PopularDishes } from './components/PopularDishes';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SpecialOffers } from './components/SpecialOffers';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { MobileCartBar } from './components/MobileCartBar';
import { FoodDetailModal } from './components/FoodDetailModal';
import { ActiveOrderPill } from './components/ActiveOrderPill';
import { ToastNotificationBar } from './components/ToastNotificationBar';
import { Search, Sparkles, Filter, X } from 'lucide-react';

function BiteRushApp() {
  const { totalItemsCount, favorites } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Compute filter counts
  const filterCounts = useMemo(() => {
    return {
      All: FOOD_ITEMS.length,
      Italian: FOOD_ITEMS.filter((i) => i.category === 'Italian').length,
      Asian: FOOD_ITEMS.filter((i) => i.category === 'Asian').length,
      Vegetarian: FOOD_ITEMS.filter((i) => i.dietary === 'veg').length,
      'Non-Vegetarian': FOOD_ITEMS.filter((i) => i.dietary === 'non-veg').length,
      Popular: FOOD_ITEMS.filter((i) => i.isPopular).length,
      Favorites: FOOD_ITEMS.filter((i) => favorites.includes(i.id)).length,
    };
  }, [favorites]);

  // Filtered list for the main explore menu
  const filteredItems = useMemo(() => {
    return FOOD_ITEMS.filter((item) => {
      // Pure Veg filter
      if (vegOnly && item.dietary !== 'veg') {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesDietary =
          (q === 'veg' || q === 'vegetarian' || q === 'pure veg') && item.dietary === 'veg'
            ? true
            : (q === 'non-veg' || q === 'non veg' || q === 'nonveg' || q === 'chicken') &&
              item.dietary === 'non-veg'
            ? true
            : false;

        if (!matchesName && !matchesDesc && !matchesCategory && !matchesDietary) {
          return false;
        }
      }

      // Category / Dietary filter
      if (activeFilter === 'Italian') return item.category === 'Italian';
      if (activeFilter === 'Asian') return item.category === 'Asian';
      if (activeFilter === 'Vegetarian') return item.dietary === 'veg';
      if (activeFilter === 'Non-Vegetarian') return item.dietary === 'non-veg';
      if (activeFilter === 'Popular') return Boolean(item.isPopular);
      if (activeFilter === 'Favorites') return favorites.includes(item.id);

      return true;
    });
  }, [searchQuery, activeFilter, vegOnly, favorites]);

  const handleBrowseMenu = () => {
    if (menuRef.current) {
      const navOffset = 80;
      const elementPosition = menuRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectFilter = (filter: FilterCategory) => {
    setActiveFilter(filter);
    handleBrowseMenu();
  };

  const italianDishes = FOOD_ITEMS.filter((item) => item.category === 'Italian');
  const asianDishes = FOOD_ITEMS.filter((item) => item.category === 'Asian');

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#FFFDF9] text-stone-900 selection:bg-orange-500 selection:text-white transition-all duration-200 ${
        totalItemsCount > 0 ? 'pb-24 md:pb-0' : ''
      }`}
    >
      {/* Sticky Navigation Bar */}
      <Navbar onSearchClick={handleBrowseMenu} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onBrowseMenu={handleBrowseMenu}
        />

        {/* Popular Dishes Highlights */}
        <PopularDishes
          items={FOOD_ITEMS}
          onViewAll={() => {
            setActiveFilter('Popular');
            handleBrowseMenu();
          }}
        />

        {/* Special Offers Section */}
        <SpecialOffers />

        {/* Dedicated Italian Food Section */}
        <section id="italian-section" className="py-16 sm:py-20 bg-[#FFFDF9] border-t border-stone-200/70 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-800 bg-orange-100/90 border border-orange-200/70 px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
                  <span>🍕 Autentico Italiano</span>
                  <span className="text-orange-300">•</span>
                  <span className="font-semibold text-orange-700">Artisanal Wood-Fired</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-stone-900 tracking-tight">
                  Italian Specialties
                </h2>
                <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl leading-relaxed">
                  Hand-stretched sourdough pizzas, slow-simmered San Marzano sauces, velvety fettuccine, and classic espresso tiramisu.
                </p>
              </div>

              <span className="text-xs font-black text-orange-900 bg-orange-50 border border-orange-200/70 px-4 py-2 rounded-xl self-start sm:self-auto shadow-2xs">
                {italianDishes.length} Handcrafted Dishes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {italianDishes.map((dish) => (
                <FoodCard key={dish.id} item={dish} />
              ))}
            </div>
          </div>
        </section>

        {/* Dedicated Asian Food Section */}
        <section id="asian-section" className="py-16 sm:py-20 bg-stone-50/70 border-t border-stone-200/70 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-100/25 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-800 bg-red-100/90 border border-red-200/70 px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
                  <span>🍜 Pan-Asian Street & Kitchen</span>
                  <span className="text-red-300">•</span>
                  <span className="font-semibold text-red-700">High Flame Wok Hei</span>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-stone-900 tracking-tight">
                  Asian Delicacies
                </h2>
                <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl leading-relaxed">
                  Wok-tossed Hakka noodles, rich 18-hour simmered ramen, double-crisped wings, and handcrafted sushi rolls.
                </p>
              </div>

              <span className="text-xs font-black text-red-900 bg-red-50 border border-red-200/70 px-4 py-2 rounded-xl self-start sm:self-auto shadow-2xs">
                {asianDishes.length} Authentic Dishes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {asianDishes.map((dish) => (
                <FoodCard key={dish.id} item={dish} />
              ))}
            </div>
          </div>
        </section>

        {/* Complete Interactive Menu with Live Search & Filter Bar */}
        <section id="full-menu" ref={menuRef} className="py-16 sm:py-24 bg-[#FFFDF9] border-t border-stone-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100/80 border border-orange-200/70 px-3.5 py-1.5 rounded-full mb-3 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Explore Everything</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-stone-900 tracking-tight mb-3">
                Our Complete Menu
              </h2>
              <p className="text-sm sm:text-base text-stone-600">
                Filter by cuisine, vegetarian preferences, or search directly for your favorite craving.
              </p>
            </div>

            {/* Sticky/Interactive Search and Filter Controls */}
            <div className="space-y-4 mb-12 max-w-4xl mx-auto">
              {/* Search Bar with Pure Veg switch */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative group flex-1">
                  <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-orange-600 transition-colors" />
                  <input
                    id="menu-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dishes by name (e.g. Margherita, Hakka Noodles, Ramen)..."
                    className="w-full pl-12 pr-11 py-3.5 sm:py-4 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl text-stone-900 placeholder:text-stone-400 text-sm sm:text-base shadow-md shadow-orange-950/5 outline-hidden focus:border-orange-500 focus:ring-4 focus:ring-orange-500/15 transition-all duration-200 font-medium"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Pure Veg Toggle Switch */}
                <button
                  id="pure-veg-toggle-btn"
                  onClick={() => setVegOnly((prev) => !prev)}
                  className={`flex items-center justify-center gap-2.5 px-4 py-3 sm:py-3.5 rounded-2xl border transition-all duration-200 cursor-pointer select-none font-bold text-xs sm:text-sm shrink-0 active:scale-95 ${
                    vegOnly
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-stone-200 text-stone-700 hover:border-emerald-300'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-xs border-2 flex items-center justify-center ${
                      vegOnly ? 'border-emerald-600' : 'border-stone-400'
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        vegOnly ? 'bg-emerald-600' : 'bg-stone-400'
                      }`}
                    />
                  </div>
                  <span>Veg Only</span>
                  <div
                    className={`w-8 h-4.5 rounded-full p-0.5 transition-colors ${
                      vegOnly ? 'bg-emerald-600' : 'bg-stone-200'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                        vegOnly ? 'translate-x-3.5' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </button>
              </div>

              {/* Filter Pills */}
              <CategoryFilter
                activeFilter={activeFilter}
                onSelectFilter={setActiveFilter}
                counts={filterCounts}
              />

              {/* Active Search & Filter Status pill */}
              {(searchQuery.trim() || activeFilter !== 'All' || vegOnly) && (
                <div className="flex items-center justify-between bg-orange-50/90 border border-orange-200 px-4 py-2.5 rounded-2xl text-xs sm:text-sm shadow-xs animate-fade-in">
                  <div className="flex items-center gap-2 text-stone-700">
                    <Filter className="w-4 h-4 text-orange-600" />
                    <span>
                      Showing <strong className="text-stone-900 font-black">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'dish' : 'dishes'}
                      {searchQuery && (
                        <> for &ldquo;<span className="text-orange-700 font-bold">{searchQuery}</span>&rdquo;</>
                      )}
                      {activeFilter !== 'All' && (
                        <> in <span className="text-orange-700 font-bold">{activeFilter}</span></>
                      )}
                      {vegOnly && (
                        <span className="text-emerald-700 font-bold"> (Veg Only)</span>
                      )}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('All');
                      setVegOnly(false);
                    }}
                    className="font-bold text-orange-600 hover:text-orange-800 underline cursor-pointer ml-2"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Menu Items Grid */}
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              /* Empty Search Results State */
              <div className="text-center py-16 px-4 bg-stone-50 rounded-3xl border border-dashed border-stone-300 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 mx-auto mb-4">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-display mb-1">
                  No delicious matches found
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mb-6">
                  We couldn't find anything matching &ldquo;{searchQuery}&rdquo;. Try checking the spelling or browse all items.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('All');
                  }}
                  className="bg-stone-900 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  View All Menu Dishes
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Customer Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Shopping Cart Slide-over Drawer */}
      <CartDrawer />

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal />

      {/* Interactive Food Details & Customization Modal */}
      <FoodDetailModal />

      {/* Floating Active Order Tracker Banner */}
      <ActiveOrderPill />

      {/* Tactile Toast Notification */}
      <ToastNotificationBar />

      {/* Mobile Sticky Floating Cart Bar */}
      <MobileCartBar />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BiteRushApp />
    </CartProvider>
  );
}
