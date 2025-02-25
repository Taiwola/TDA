import React from "react";

export const SkeletonLoading = () => {
  return (
    <div className="p-5 mt-6">
      <h3 className="text-lg font-semibold pb-2">Popular Products</h3>
      <hr />
      {[...Array(5)].map((_, index) => (
        <div key={index} className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="ml-4">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-16 mt-2 animate-pulse"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-8 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};
