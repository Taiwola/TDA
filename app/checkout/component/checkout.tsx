"use client";
import { Summary } from "@/app/component/summary";
import { Button } from "@heroui/react";
import React from "react";

export default function Checkout() {
  const cartItems = [
    {
      title: "Wireless Headphones",
      quantity: 2,
      price: 49.99,
      image: "/images/kaftan3.png",
    },
    {
      title: "Bluetooth Speaker",
      quantity: 1,
      price: 29.99,
      image: "/images/kaftan3.png",
    },
    {
      title: "Smartwatch",
      quantity: 1,
      price: 99.99,
      image: "/images/kaftan3.png",
    },
  ];

  return (
    <section className="container mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] mt-6 mb-6 gap-8">
        {/* Order Summary */}
        <div className="p-4">
          <Summary cart={cartItems} checkoutPage={true} />
        </div>
        {/* Checkout Form */}
        <div className="p-4">
          <h1 className="font-bold mb-6 text-3xl">Checkout</h1>

          {/* Shipping Address */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Country"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </form>
          </div>

          {/* Payment Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Expiration Date (MM/YY)"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </form>
          </div>

          {/* Place Order Button */}
          <Button
            className="w-full bg-burntgold text-white rounded-sm hover:bg-black transition-all"
            variant="bordered"
          >
            Place Order
          </Button>
        </div>
      </div>
    </section>
  );
}
