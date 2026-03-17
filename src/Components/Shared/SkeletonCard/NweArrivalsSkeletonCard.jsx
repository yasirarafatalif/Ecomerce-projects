import React from 'react';

const NweArrivalsSkeletonCard = () => {
    return (
        <div className="flex flex-col animate-pulse">
    {/* Image Skeleton */}
    <div className="relative aspect-[3/4] bg-gray-200">
      {/* Subtle grainy overlay to match brand texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]"></div>
    </div>

    {/* Details Skeleton */}
    <div className="mt-5 flex justify-between items-start px-1">
      <div className="w-full">
        {/* Category Line */}
        <div className="h-2 w-20 bg-gray-200 mb-3"></div>
        {/* Title Line 1 */}
        <div className="h-3 w-[85%] bg-gray-200 mb-2"></div>
        {/* Title Line 2 (Short) */}
        <div className="h-3 w-[50%] bg-gray-200"></div>
      </div>
      {/* Price Skeleton */}
      <div className="h-3 w-12 bg-gray-200"></div>
    </div>
  </div>
    );
};

export default NweArrivalsSkeletonCard;