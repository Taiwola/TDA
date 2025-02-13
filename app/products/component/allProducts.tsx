"use client";
import React from "react";
import { NavLink } from "@/app/component/Navlink";
import ProductCard from "@/app/component/ProductCard";

export default function AllProducts() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "₦38,500",
      image: "/images/kaftan5.jpg",
      link: "/product/1",
    },
    {
      id: 2,
      name: "Product 2",
      price: "₦46,200",
      image: "/images/kaftan6.jpg",
      link: "/product/2",
    },
    {
      id: 3,
      name: "Product 3",
      price: "₦53,900",
      image: "/images/kaftan1.jpg",
      link: "/product/3",
    },
    {
      id: 4,
      name: "Product 4",
      price: "₦53,900",
      image: "/images/kaftan2.jpg",
      link: "/product/3",
    },
    {
      id: 5,
      name: "Product 5",
      price: "₦53,900",
      image: "/images/kaftan3.png",
      link: "/product/3",
    },
    {
      id: 6,
      name: "Product 6",
      price: "₦53,900",
      image: "/images/kaftan4.png",
      link: "/product/3",
    },
    {
      id: 7,
      name: "Product 7",
      price: "₦53,900",
      image: "/images/kaftan2.jpg",
      link: "/product/3",
    },
    {
      id: 8,
      name: "Product 8",
      price: "₦53,900",
      image: "/images/kaftan1.jpg",
      link: "/product/3",
    },
    {
      id: 9,
      name: "Product 9",
      price: "₦53,900",
      image: "/images/kaftan3.png",
      link: "/product/3",
    },
    {
      id: 10,
      name: "Product 10",
      price: "₦53,900",
      image: "/images/kaftan4.png",
      link: "/product/3",
    },
  ];

  return (
    <div className="flex min-h-screen p-6">
      {/* Sidebar for Categories */}
      <aside className="p-4 border-r">
        <h2 className="text-sm text-black font-extralight mb-4">Categories</h2>
        <ul className="space-y-2">
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
      <main className="flex-1 mx-6 p-6">
        <h2 className="text-sm text-black font-extralight mb-4">
          All Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {products.map((relatedProduct, index) => (
            <ProductCard
              key={index}
              product={relatedProduct}
              index={index}
              isButtomAllowed={true}
            />
          ))}
        </div>
      </main>

      {/* Sort Options */}
      <aside className="p-4">
        <h2 className="text-sm text-black font-extralight mb-4">Sort By</h2>
        <ul className="space-y-2">
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
