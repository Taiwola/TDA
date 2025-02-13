import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ModalComponent from "./modal/modal";
import { Button } from "@heroui/react";

type Props = {
  product: {
    id: number;
    link: string;
    image: string;
    name: string;
    price: string;
  };
  index: number;
  isButtomAllowed: boolean;
};

export default function ProductCard({
  product,
  index,
  isButtomAllowed,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Define measurements for each size
  const measurements: Record<
    string,
    {
      Neck: number;
      Chest: number;
      back: number;
      Stomach: number;
      Hips: number;
      Trouser_waist: number;
      Thigh: number;
      Calf: number;
      Bottom: number;
    }
  > = {
    M: {
      Neck: 17,
      back: 19,
      Chest: 44,
      Stomach: 43,
      Hips: 48,
      Trouser_waist: 35,
      Thigh: 26,
      Calf: 16,
      Bottom: 14,
    },
    L: {
      Neck: 18,
      back: 20,
      Chest: 46,
      Stomach: 45,
      Hips: 47,
      Trouser_waist: 38,
      Thigh: 27,
      Calf: 17,
      Bottom: 14,
    },
    XL: {
      Neck: 19,
      back: 21,
      Chest: 49,
      Stomach: 48,
      Hips: 50,
      Trouser_waist: 40,
      Thigh: 29,
      Calf: 18,
      Bottom: 14.5,
    },
    "2XL": {
      Neck: 21,
      back: 24,
      Chest: 54,
      Stomach: 54,
      Hips: 56,
      Trouser_waist: 46,
      Thigh: 34,
      Calf: 21,
      Bottom: 16,
    },
  };

  return (
    <>
      {/* Product Card */}
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="overflow-hidden transition-all relative"
      >
        <Link href={product.link}>
          <div className="relative h-80 transition-all">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain border"
              quality={100}
            />
          </div>
        </Link>

        {isButtomAllowed && (
          <div className="flex flex-col gap-2 p-4 bg-white bg-opacity-90 hover:bg-opacity-100 transition-all">
            <h3 className="text-lg font-semibold text-gray-900">
              {product.name}
            </h3>
            <p className="text-sm text-gray-700">{product.price}</p>
            <Button
              variant="faded"
              className="mt-2 text-sm font-light text-burntgold border"
              onPress={() => setIsModalOpen(true)}
            >
              Select Options
            </Button>
          </div>
        )}
      </motion.div>

      {/* Modal for Size Selection */}
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Size"
        footer={false}
      >
        <div className="flex flex-col gap-6">
          {/* Size Selection */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(measurements).map((size) => (
              <button
                key={size}
                className={`px-4 py-2 border rounded-lg transition ${
                  selectedSize === size
                    ? "bg-burntgold text-white border-transparent"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Measurement Display with Animation */}
          <AnimatePresence mode="wait">
            {selectedSize && (
              <motion.div
                key={selectedSize}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h5 className="font-semibold text-center mb-4">
                  Measurements for {selectedSize}:
                </h5>
                <ul className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                  {Object.entries(measurements[selectedSize]).map(
                    ([key, value]) => (
                      <li key={key} className="flex gap-2">
                        <span className="capitalize">
                          {key === "Trouser_waist" ? "Trouser Waist" : key}:
                        </span>
                        <span>{value} inches</span>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <hr className="my-4" />

          {/* Quantity and Add to Cart */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                onClick={handleDecrease}
                disabled={quantity === 1}
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            <Button
              variant="faded"
              className="bg-burntgold text-white font-semibold py-2 px-6 rounded-md"
              onPress={() => {
                console.log(
                  `Added to cart: ${product.name}, Size: ${selectedSize}, Qty: ${quantity}`
                );
                setSelectedSize("");
              }}
              disabled={!selectedSize}
            >
              Add to Cart
            </Button>
          </div>
          {/* Policy Note */}
          <p className="text-sm text-gray-500 mt-3">
            Note: All sales are final. Exchanges are available within 48 hours
            of delivery for unworn, unused items in their original packaging
            with tags attached. See our full Returns & Exchanges Policy for
            details.
          </p>
        </div>
      </ModalComponent>
    </>
  );
}
