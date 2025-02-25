import React from "react";
import Checkout from "./component/checkout";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";

export default function page() {
  return (
    <div>
      <Header />
      <Checkout />
      <Footer />
    </div>
  );
}
