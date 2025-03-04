"use client";
import { Button } from "@heroui/react";
import React, { useState } from "react";
import { Summary } from "@/app/component/summary";
import { CartItem } from "@/app/lib/session";

type Props = {
  cartItems?: CartItem[];
};

export default function Checkout({ cartItems = [] }: Props) {
  // Shipping locations and prices
  const shippingOptions = [
    { location: "Amuwo Odofin", price: 7000 },
    { location: "Apapa", price: 6500 },
    { location: "Badagry", price: 15000 },
    { location: "Agege", price: 6500 },
    { location: "Alimosho", price: 11000 },
    { location: "Ikeja", price: 7000 },
    { location: "Surulere", price: 500 }, // Assuming N,500 was a typo for N500
    { location: "Ajeromi-Ifelodun", price: 7000 },
    { location: "Epe", price: 11000 },
    { location: "Eti-Osa", price: 5000 },
    { location: "Ibeju Lekki", price: 9000 },
    { location: "Ikorodu", price: 11000 },
    { location: "Lagos Island", price: 3500 },
    { location: "Lagos Mainland", price: 6500 },
    { location: "Mushin", price: 6000 },
    { location: "Ojo", price: 12000 },
  ];

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]); // Default to first option

  return (
    <section className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
        {/* Order Summary */}
        <div className="p-6 lg:sticky lg:top-8">
          <Summary
            cart={cartItems}
            checkoutPage={true}
            shippingCost={selectedShipping.price}
          />
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Shipping Address */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Shipping Address
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  placeholder="Address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    placeholder="City"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    placeholder="Postal Code"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="shippingLocation"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Shipping Location
                </label>
                <select
                  id="shippingLocation"
                  value={selectedShipping.location}
                  onChange={(e) => {
                    const selected = shippingOptions.find(
                      (opt) => opt.location === e.target.value
                    );
                    if (selected) setSelectedShipping(selected);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                >
                  {shippingOptions.map((option) => (
                    <option key={option.location} value={option.location}>
                      {option.location} - ₦{option.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Shipping Cost:{" "}
                <span className="font-semibold text-amber-700">
                  ₦{selectedShipping.price.toLocaleString()}
                </span>
              </p>
            </form>
          </div>

          {/* Payment Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Payment Details
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="Card Number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiration Date (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="CVV"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Place Order Button */}
          <Button className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
            Place Order
          </Button>
        </div>
      </div>
    </section>
  );
}
