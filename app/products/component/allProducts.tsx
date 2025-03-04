"use client";
import React, { useState } from "react";
import { NavLink } from "@/app/component/Navlink";
import ProductCard from "@/app/component/ProductCard";
import { Menu, X } from "lucide-react"; // Add icons for toggling

export default function AllProducts() {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 38500,
      image: "/images/kaftan5.jpg",
      link: "/product/1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 46200,
      image: "/images/kaftan6.jpg",
      link: "/product/2",
    },
    {
      id: 3,
      name: "Product 3",
      price: 53900,
      image: "/images/kaftan1.jpg",
      link: "/product/3",
    },
    {
      id: 4,
      name: "Product 4",
      price: 53900,
      image: "/images/kaftan2.jpg",
      link: "/product/4",
    },
    {
      id: 5,
      name: "Product 5",
      price: 53900,
      image: "/images/kaftan3.png",
      link: "/product/5",
    },
    {
      id: 6,
      name: "Product 6",
      price: 53900,
      image: "/images/kaftan4.png",
      link: "/product/6",
    },
    {
      id: 7,
      name: "Product 7",
      price: 53900,
      image: "/images/kaftan2.jpg",
      link: "/product/7",
    },
    {
      id: 8,
      name: "Product 8",
      price: 53900,
      image: "/images/kaftan1.jpg",
      link: "/product/8",
    },
    {
      id: 9,
      name: "Product 9",
      price: 53900,
      image: "/images/kaftan3.png",
      link: "/product/9",
    },
    {
      id: 10,
      name: "Product 10",
      price: 53900,
      image: "/images/kaftan4.png",
      link: "/product/10",
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 flex flex-col md:flex-row">
      {/* Categories Sidebar (Hidden on mobile by default) */}
      <aside className="md:w-1/5 mb-4 md:mb-0 md:border-r">
        <div className="flex justify-between items-center md:hidden">
          <h2 className="text-sm text-black font-extralight">Categories</h2>
          <button onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}>
            {isCategoriesOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        <ul
          className={`space-y-2 mt-2 md:mt-0 ${
            isCategoriesOpen ? "block" : "hidden md:block"
          }`}
        >
          <li className="text-burntgold font-bold">
            <NavLink href="/products">All</NavLink>
          </li>
          <li>
            <NavLink href="/products">Kaftan</NavLink>
          </li>
          <li>
            <NavLink href="/products">Footwears</NavLink>
          </li>
          <li>
            <NavLink href="/products">Agbada</NavLink>
          </li>
        </ul>
      </aside>

      {/* Main Content for Products */}
      <main className="flex-1 mx-0 md:mx-6">
        <h2 className="text-sm text-black font-extralight mb-4">
          All Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((relatedProduct, index) => (
            <ProductCard
              key={relatedProduct.id} // Use id instead of index for better key uniqueness
              product={relatedProduct}
              index={index} // Still pass index for animation delay
              isButtomAllowed={true}
            />
          ))}
        </div>
      </main>

      {/* Sort Options (Hidden on mobile by default) */}
      <aside className="md:w-1/5 mt-4 md:mt-0">
        <div className="flex justify-between items-center md:hidden">
          <h2 className="text-sm text-black font-extralight">Sort By</h2>
          <button onClick={() => setIsSortOpen(!isSortOpen)}>
            {isSortOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        <ul
          className={`space-y-2 mt-2 md:mt-0 ${
            isSortOpen ? "block" : "hidden md:block"
          }`}
        >
          <li className="text-burntgold font-bold">
            <NavLink href="/products">Newest</NavLink>
          </li>
          <li>
            <NavLink href="/products">Trending</NavLink>
          </li>
          <li>
            <NavLink href="/products">Best Selling</NavLink>
          </li>
          <li>
            <NavLink href="/products">Price: Low to High</NavLink>
          </li>
          <li>
            <NavLink href="/products">Price: High to Low</NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
}
