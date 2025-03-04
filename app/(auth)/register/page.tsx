import React from "react";
import RegisterPage from "./component/register";
import { Metadata } from "next";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import { getSessionData } from "@/app/lib/session";

export const metadata: Metadata = {
  title: "sign up",
  description: "TDA Register Page",
};

export default async function page() {
  // Fetch session token server-side
  const token = await getSessionData("token");
  const isSignedIn = !!token; // Convert to boolean
  return (
    <>
      <Header isSignedIn={isSignedIn} />
      <RegisterPage />
      <Footer />
    </>
  );
}
