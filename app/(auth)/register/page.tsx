import React from "react";
import RegisterPage from "./component/register";
import { Metadata } from "next";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";

export const metadata: Metadata = {
  title: "sign up",
  description: "TDA Register Page",
};

export default function page() {
  return (
    <>
      <Header />
      <RegisterPage />
      <Footer />
    </>
  );
}
