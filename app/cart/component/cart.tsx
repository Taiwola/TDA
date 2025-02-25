"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { CartTable } from "./cartTable";
import { Summary } from "@/app/component/summary";

export default function Cart() {
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

  const [cart, setCart] = useState(cartItems);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <section className="container mx-auto w-full">
      <div className="grid grid-cols-1 md:grid-cols-[70%_30%] mt-6 mb-6">
        <div className="p-4">
          <div className="flex justify-between mb-3">
            <div>
              <h2 className="font-bold text-base">Already have an account?</h2>
              <p className="text-muted-foreground font-thin text-sm">
                Sign for a better experience
              </p>
            </div>
            <div>
              <Link href={"/login"}>
                <Button
                  variant="bordered"
                  className="bg-burntgold rounded-sm text-white text-sm transition-all hover:bg-black"
                >
                  sign in
                </Button>
              </Link>
            </div>
          </div>
          <hr />
          <div className="mt-3">
            <h1 className="font-bold mb-3 text-3xl">Cart</h1>
            <CartTable cart={cart} onQuantityChange={handleQuantityChange} />
          </div>
        </div>
        <Summary cart={cartItems} checkoutPage={false} />
      </div>
    </section>
  );
}
