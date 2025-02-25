import React, { Suspense } from "react";
import { PopularProductCard } from "./popularProductCard";
import { SkeletonLoading } from "./skeletonLoading";

export const PopularProduct = () => {
  // Dummy data for popular products
  const dummyProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "/images/kaftan1.jpg",
      rating: 4.5,
      quantity: 10,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image: "/images/catalogue1.jpeg",
      rating: 4.2,
      quantity: 10,
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 59.99,
      image: "/images/kaftan5.jpg",
      rating: 4.7,
      quantity: 10,
    },
    {
      id: 4,
      name: "Gaming Mouse",
      price: 49.99,
      image: "/images/kaftan3.png",
      rating: 4.0,
      quantity: 10,
    },
    {
      id: 5,
      name: "Laptop Backpack",
      price: 39.99,
      image: "/images/kaftan5.jpg",
      rating: 4.8,
      quantity: 10,
    },
  ];

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-xl pb-16">
      <h3 className="text-lg font-semibold px-7 pt-5 pb-2">Popular Products</h3>
      <hr />
      <Suspense fallback={<SkeletonLoading />}>
        <div className="overflow-auto h-full">
          {dummyProducts.map((product) => (
            <PopularProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  );
};
