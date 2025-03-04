import { Metadata } from "next";
import React from "react";
import Cart from "./component/cart";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import { getSessionData } from "../lib/session";

export const metadata: Metadata = {
  title: "Cart",
  description: "TDA Cart Page",
};

export default async function page() {
  // Fetch session token server-side
  const token = await getSessionData("token");
  const isSignedIn = !!token; // Convert to boolean
  return (
    <>
      <Header isSignedIn={isSignedIn} />
      <Cart />
      <Footer />
    </>
  );
}
