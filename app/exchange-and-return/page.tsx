import React from "react";
import ExchangeAndReturn from "./component/exchangeAndReturn";
import Footer from "../component/Footer";
import Header from "../component/Header";
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
      <ExchangeAndReturn />
      <Footer />
    </>
  );
}
