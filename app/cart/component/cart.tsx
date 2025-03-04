"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { CartTable } from "./cartTable";
import { Summary } from "@/app/component/summary";
import { CartItem } from "@/app/lib/session";

type Props = {
  cartItems?: CartItem[];
};

export default function Cart({ cartItems = [] }: Props) {
  const [cart, setCart] = useState(cartItems);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent negative or zero quantities
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Left Section: Cart Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Sign In Prompt */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-200 pb-6">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-lg font-semibold text-gray-900">
                Already have an account?
              </h2>
              <p className="text-sm text-gray-600">
                Sign in for a faster checkout
              </p>
            </div>
            <Link href="/login">
              <Button className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Cart Table */}
          {cart.length > 0 ? (
            <CartTable cart={cart} onQuantityChange={handleQuantityChange} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">Your cart is empty</p>
              <Link
                href="/products"
                className="text-amber-600 hover:underline text-sm mt-2 inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Right Section: Summary */}
        <div className="lg:sticky lg:top-8">
          <Summary cart={cart} checkoutPage={false} />
          {/* Continue Shopping Link */}
          <Link
            href="/products"
            className="block mt-4 text-center text-amber-600 hover:underline text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
