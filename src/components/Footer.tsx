import React from 'react';
import { UtensilsCrossed, Heart, MapPin, Phone, Mail, Clock, Instagram, Twitter, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="main-footer" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1 & 2: Brand and Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black font-display text-white tracking-tight">
                Bite<span className="text-orange-500">Rush</span>
              </span>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Authentic Italian wood-fired delights & vibrant Asian wok creations, handcrafted with prime ingredients and delivered piping hot in 25–35 minutes.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-600 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-600 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-orange-600 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Italian Cuisine */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-display">
              Italian Menu
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Margherita Pizza</li>
              <li>Farmhouse Pizza</li>
              <li>Creamy Alfredo Pasta</li>
              <li>Spicy Arrabbiata Pasta</li>
              <li>Garlic Bread Confit</li>
              <li>Classic Tiramisu</li>
            </ul>
          </div>

          {/* Col 4: Asian Cuisine */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-display">
              Asian Menu
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>Veg Hakka Noodles</li>
              <li>Chicken Hakka Noodles</li>
              <li>Veg Fried Rice</li>
              <li>Crispy Chicken Wings</li>
              <li>Salmon Sushi Rolls</li>
              <li>Umami Ramen Bowl</li>
            </ul>
          </div>

          {/* Col 5: Operating Hours & Contact */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-display">
              Kitchen Hours
            </h4>
            <div className="space-y-3 text-sm text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block font-medium">Every Day</span>
                  <span>11:00 AM – 11:30 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Express delivery within 7 km campus radius</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with competition credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} BiteRush Food Delivery. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built for Web Development Competition</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>with React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
