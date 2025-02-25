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
};

export const Summary = ({ cart, checkoutPage }: SummaryProps) => {
  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Shipping cost (fixed for this example)
  const shipping = 5.99;

  // Calculate total
  const total = subtotal + shipping;

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Summary</h2>

      <hr className="mb-5" />

      {/* Subtotal */}
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-semibold">${subtotal.toFixed(2)}</span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between mb-5">
        <span className="text-gray-600">Shipping</span>
        <span className="font-semibold">${shipping.toFixed(2)}</span>
      </div>

      <hr className="mb-5" />

      {/* Total */}
      <div className="flex justify-between mb-9">
        <span className="text-gray-600">Total</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>

      {/* Checkout Button */}
      {!checkoutPage && (
        <Link href="/checkout">
          <Button
            className="w-full bg-burntgold text-white rounded-sm hover:bg-black transition-all"
            variant="bordered"
          >
            Proceed to Checkout
          </Button>
        </Link>
      )}
    </div>
  );
};
