import React from 'react';
import { DietaryType } from '../types';

interface DietaryBadgeProps {
  type: DietaryType;
  showText?: boolean;
  size?: 'sm' | 'md';
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({
  type,
  showText = false,
  size = 'md',
}) => {
  const isVeg = type === 'veg';

  const boxSize = size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5';
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <div className="inline-flex items-center gap-1.5" title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}>
      <span
        className={`${boxSize} border-2 ${
          isVeg ? 'border-emerald-600' : 'border-rose-600'
        } rounded-[4px] flex items-center justify-center p-0.5 bg-white/90 shadow-2xs`}
      >
        <span
          className={`${dotSize} rounded-full ${
            isVeg ? 'bg-emerald-600' : 'bg-rose-600'
          }`}
        />
      </span>
      {showText && (
        <span
          className={`text-xs font-semibold ${
            isVeg ? 'text-emerald-700' : 'text-rose-700'
          }`}
        >
          {isVeg ? 'Pure Veg' : 'Non-Veg'}
        </span>
      )}
    </div>
  );
};
