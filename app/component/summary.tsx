import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

type SummaryProps = {
  cart: {
    title: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  checkoutPage: boolean;
  shippingCost?: number; // Optional shipping cost from Checkout page
};

export const Summary = ({
  cart,
  checkoutPage,
  shippingCost = 0,
}: SummaryProps) => {
  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Use shippingCost if provided and non-zero, otherwise 0
  const shipping = shippingCost || 0;

  // Calculate total (only add shipping if it exists)
  const total = subtotal + shipping;

  return (
    <div className="p-6 rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>

      <hr className="mb-5 border-gray-200" />

      {/* Subtotal */}
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-semibold text-gray-900">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Shipping (only shown if shippingCost is provided and non-zero) */}
      {shipping > 0 && (
        <div className="flex justify-between mb-5">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-gray-900">
            ₦{shipping.toLocaleString()}
          </span>
        </div>
      )}

      <hr className="mb-5 border-gray-200" />

      {/* Total */}
      <div className="flex justify-between mb-9">
        <span className="text-gray-600 text-lg font-semibold">Total</span>
        <span className="font-semibold text-amber-700 text-lg">
          {shipping > 0 ? "₦" : "$"}
          {total.toLocaleString("en-NG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* Checkout Button */}
      {!checkoutPage && (
        <Link href="/checkout">
          <Button className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </div>
  );
};
