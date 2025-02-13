"use client";
import React, { useState } from "react";
import Image from "next/image";
import ProductCard from "@/app/component/ProductCard";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

type Measurement = {
  Neck: number;
  back: number;
  Chest: number;
  Stomach: number;
  Hips: number;
  Trouser_waist: number;
  Thigh: number;
  Calf: number;
  Bottom: number;
};

type Measurements = {
  M: Measurement;
  L: Measurement;
  XL: Measurement;
  "2XL": Measurement;
};

export default function Product() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  // Sample product data
  const product = {
    id: 1,
    title: "Product Title",
    description:
      "This is a detailed description of the product. It includes information about the features, materials, and benefits of the product.",
    price: "₦30,800",
    images: [
      "/images/kaftan5.jpg",
      "/images/kaftan1.jpg",
      "/images/kaftan2.jpg",
    ],
    colors: ["Red", "Blue", "Green"],
    sizes: ["M", "L", "XL", "2XL"],
    measurements: {
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
    } as Measurements,
  };

  const [selectedImage, setSelectedImage] = React.useState(product.images[0]);
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = React.useState("");

  // Sample related products
  const relatedProducts = [
    {
      id: 2,
      name: "Related Product 1",
      price: "₦30,800",
      image: "/images/kaftan4.png",
      link: "/product/2",
    },
    {
      id: 3,
      name: "Related Product 2",
      price: "₦46,500",
      image: "/images/kaftan5.jpg",
      link: "/product/3",
    },
    {
      id: 4,
      name: "Related Product 3",
      price: "₦23,100",
      image: "/images/kaftan1.jpg",
      link: "/product/4",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image Gallery */}
        <div className="flex-1">
          <div className="relative h-96 mb-4">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain rounded-lg"
              quality={100}
            />
          </div>
          <div className="flex gap-2 justify-center items-center">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`w-20 h-20 relative border-2 rounded-lg overflow-hidden ${
                  selectedImage === image
                    ? "border-burntgold"
                    : "border-gray-300"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Title, Description, and Options */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 font-light tracking-tight mb-6">
            {product.description}
          </p>

          <p className="text-2xl font-semibold text-burnt-gold mb-6">
            {product.price}
          </p>

          <hr />

          {/* Color Selection */}
          <div className="mb-6 mt-6">
            <h3 className="text-lg font-semibold mb-2">Color</h3>
            <div className="flex gap-2">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 font-light border rounded-lg ${
                    selectedColor === color
                      ? "border-burnt-gold bg-burntgold text-white"
                      : "border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Size</h3>
            <div className="flex gap-2">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg ${
                    selectedSize === size
                      ? "border-burnt-gold bg-burntgold text-white"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* measurements */}
          <AnimatePresence mode="wait">
            {selectedSize && (
              <motion.div
                key={selectedSize}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h5 className="font-semibold text-center mb-2">
                  Measurements for {selectedSize}:
                </h5>
                <ul className="text-sm text-muted-foreground space-y-1 flex flex-wrap gap-4 justify-center items-center">
                  {Object.entries(
                    product.measurements[selectedSize as keyof Measurements]
                  ).map(([key, value]) => (
                    <li key={key}>
                      <strong>
                        {key === "Trouser_waist" ? "Trouser Waist" : key}:
                      </strong>{" "}
                      {value} inches
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <hr className="mt-7 mb-7" />

          {/* Add to Cart Button */}
          <div className="flex w-full justify-between items-center">
            {/* Quantity Selection */}
            <div className="flex items-center gap-4 w-[20%]">
              <button
                className="p-2 bg-gray-300 rounded-md"
                onClick={handleDecrease}
                disabled={quantity === 1}
              >
                −
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                className="p-2 bg-gray-300 rounded-md"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="faded"
              className="bg-burntgold text-white w-[80%] font-semibold py-2 rounded-md"
              onPress={() => {
                console.log(
                  `Added to cart: ${product.title}, Size: ${selectedSize}, Qty: ${quantity}, selectedColor: ${selectedColor}`
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
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard
              key={index}
              product={relatedProduct}
              index={index}
              isButtomAllowed={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
