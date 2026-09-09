import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { REVIEWS } from '../data/extraSections';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="customer-reviews" className="py-14 sm:py-20 bg-[#FFFDF9] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100/70 px-3 py-1 rounded-full mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-stone-900 tracking-tight mb-3">
            Loved By Our Food Community
          </h2>
          <p className="text-sm sm:text-base text-stone-600">
            Real reviews from real students, faculty, and foodies in our delivery network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-orange-200" />
                </div>

                <p className="text-stone-700 text-sm leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 font-display">
                      {review.name}
                    </h4>
                    <p className="text-xs text-stone-500">{review.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-stone-400 block">{review.date}</span>
                  <span className="text-[11px] font-semibold text-orange-600">
                    Fave: {review.favoriteDish}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
