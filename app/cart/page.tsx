import { Metadata } from "next";
import React from "react";
import Cart from "./component/cart";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";

export const metadata: Metadata = {
  title: "Cart",
  description: "TDA Cart Page",
};

export default function page() {
  return (
    <>
      <Header />
      <Cart />
      <Footer />
    </>
  );
}
