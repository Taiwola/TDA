import React from "react";
import Checkout from "./component/checkout";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import { getSessionData } from "../lib/session";
import { GetCart } from "../lib/action";

export default async function page() {
  // Fetch session token server-side
  const token = await getSessionData("token");
  const isSignedIn = !!token; // Convert to boolean
  const cartResult = await GetCart();
  const initialCart = cartResult.success ? cartResult.cart : [];
  return (
    <>
      <Header initialCart={initialCart} isSignedIn={isSignedIn} />
      <Checkout cartItems={initialCart} />
      <Footer />
    </>
  );
}
