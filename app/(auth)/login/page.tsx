import { Metadata } from "next";
import Login from "./component/login";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";

export const metadata: Metadata = {
  title: "Sign in",
  description: "TDA Login Page",
};

export default function page() {
  return (
    <>
      <Header />
      <Login />
      <Footer />
    </>
  );
}
