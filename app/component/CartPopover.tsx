// component/CartModalContent.tsx
"use client";
import React from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

const CartModalContent = () => {
  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: "Product 1",
      price: 49.99,
      image: "/images/kaftan1.jpg",
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: 59.99,
      image: "/images/kaftan2.jpg",
      quantity: 1,
    },
  ]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      {/* Cart Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">Your Cart</h3>
        <p className="text-sm text-gray-500">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Cart Items */}
      <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <AnimatePresence>
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 text-center text-gray-500"
            >
              <p className="text-lg">Your cart is empty</p>
              <Link
                href="/products"
                className="text-amber-600 hover:underline text-sm mt-2 inline-block"
              >
                Start Shopping
              </Link>
            </motion.div>
          ) : (
            cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                    quality={80}
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold text-amber-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full transition-colors"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Cart Footer */}
      {cartItems.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold text-gray-900">Total</p>
            <p className="text-lg font-semibold text-amber-700">
              ${total.toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <Link href="/cart">
              <Button className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all">
                View Cart
              </Button>
            </Link>
            <Link href="/checkout">
              <Button className="w-full bg-amber-600 text-white py-2.5 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModalContent;
