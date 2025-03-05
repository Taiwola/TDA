"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export default function FeatureSection() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 38500,
      image: "/images/kaftan1.jpg",
      link: "/product/1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 46500,
      image: "/images/kaftan2.jpg",
      link: "/product/2",
    },
    {
      id: 3,
      name: "Product 3",
      price: 54000,
      image: "/images/kaftan3.png",
      link: "/product/3",
    },
    {
      id: 4,
      name: "Product 4",
      price: 54000,
      image: "/images/kaftan4.png",
      link: "/product/4",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="container mx-auto px-6 py-12"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-center mb-8">Catalogue</h2>
        <Button variant={"link"}>
          <Link
            href="/products?categories=kaftans"
            className="hover:text-burntgold inline-flex gap-2"
          >
            View More <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            isButtomAllowed={false}
          />
        ))}
      </div>
    </motion.section>
  );
}
