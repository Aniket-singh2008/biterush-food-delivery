export interface Review {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  favoriteDish: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  tagline: string;
  code: string;
  discountText: string;
  badge: string;
  bgGradient: string;
  cuisine: string;
}

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: 'offer-1',
    title: 'Italian Feast Bonanza',
    tagline: '50% off up to ₹100 on artisanal pizzas and gourmet pasta.',
    code: 'BITERUSH50',
    discountText: 'FLAT 50% OFF',
    badge: 'Limited Time',
    bgGradient: 'from-orange-500 to-amber-600',
    cuisine: 'Italian',
  },
  {
    id: 'offer-2',
    title: 'Campus Foodie Combo',
    tagline: 'Special student discount! Save ₹150 on Asian noodle & sushi bowls.',
    code: 'COLLEGEFEST',
    discountText: 'FLAT 20% OFF',
    badge: 'Student Special',
    bgGradient: 'from-red-500 to-rose-600',
    cuisine: 'Asian',
  },
  {
    id: 'offer-3',
    title: 'Weekend Rush Express',
    tagline: 'Complimentary lightning delivery on all orders over ₹400.',
    code: 'FREEBIE',
    discountText: 'ZERO DELIVERY FEE',
    badge: 'Weekend Deal',
    bgGradient: 'from-amber-500 to-orange-600',
    cuisine: 'Both Cuisines',
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: 'Zap',
    title: '30-Min Fast Delivery',
    description: 'Hot, fresh food zipped right from the kitchen flame to your doorstep in 30 minutes flat.',
    stat: '25 mins avg',
  },
  {
    icon: 'ChefHat',
    title: 'Master Culinary Chefs',
    description: 'Authentic recipes prepared by specialized Italian pizzaoli and Asian wok masters.',
    stat: '100% Authentic',
  },
  {
    icon: 'ShieldCheck',
    title: 'Hygienic Eco Packaging',
    description: 'Tamper-proof, temperature-insulated, and eco-friendly recyclable food boxes.',
    stat: '5-Star Safety',
  },
  {
    icon: 'HeartHandshake',
    title: 'Best Price Guarantee',
    description: 'Pocket-friendly prices with frequent college discounts, zero hidden convenience fees.',
    stat: '₹0 Hidden Fees',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Aarav Sharma',
    role: 'Computer Science Student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Yesterday',
    comment: 'The Alfredo Pasta and Garlic Bread combo is out of this world! Piping hot delivery right before our group study session.',
    favoriteDish: 'Alfredo Pasta',
  },
  {
    id: 'rev-2',
    name: 'Sneha Patel',
    role: 'Design Major & Foodie',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 days ago',
    comment: 'BiteRush’s Ramen Bowl broth has such deep flavor, and the Farmhouse Pizza crust was wonderfully crisp. Fast and super clean packaging!',
    favoriteDish: 'Ramen Bowl',
  },
  {
    id: 'rev-3',
    name: 'Rohan Verma',
    role: 'Tech Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Last week',
    comment: 'The chicken wings are addictive! Crispy skin, spicy glaze, and the quantity management on this site is so seamless and responsive.',
    favoriteDish: 'Chicken Wings',
  },
];
