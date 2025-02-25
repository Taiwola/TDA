import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CartPopoverContent = () => {
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: "$49.99",
      image: "/images/kaftan1.jpg",
      quantity: 2,
    },
    {
      id: 2,
      name: "Product 2",
      price: "$59.99",
      image: "/images/kaftan2.jpg",
      quantity: 1,
    },
  ];

  return (
    <div>
      {/* Cart Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Your Cart</h3>
        <p className="text-sm text-gray-500">{cartItems.length} items</p>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 text-center text-gray-500"
            >
              Your cart is empty.
            </motion.div>
          ) : (
            cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center w-full p-4 border-b border-gray-200"
              >
                {/* Product Image */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-lg"
                    quality={100}
                  />
                </div>

                {/* Product Details */}
                <div className="ml-4 flex-1">
                  <h4 className="text-md font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">{item.price}</p>
                </div>

                {/* Remove Button */}
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Cart Footer */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          {/* Total Price */}
          <div className="flex justify-between mb-4">
            <p className="text-lg font-semibold">Total</p>
            <p className="text-lg font-semibold">$0.00</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Link href={"/cart"}>
              <Button
                variant="faded"
                className="hover:bg-burntgold rounded-sm transition-all"
              >
                View Cart
              </Button>
            </Link>
            <Link href={"/checkout"}>
              <Button
                variant="faded"
                className="bg-burntgold rounded-sm hover:bg-black hover:text-white transition-all"
              >
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPopoverContent;
