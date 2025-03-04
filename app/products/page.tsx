import { Metadata } from "next";
import AllProducts from "./component/allProducts";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import { getSessionData } from "../lib/session";
import { GetCart } from "../lib/action";

export const metadata: Metadata = {
  title: "Products",
  description: "TDA Single Product",
};

export default async function Page() {
  // Fetch session token server-side
  const token = await getSessionData("token");
  const isSignedIn = !!token; // Convert to boolean
  const cartResult = await GetCart();
  const initialCart = cartResult.success ? cartResult.cart : [];
  return (
    <>
      <Header initialCart={initialCart} isSignedIn={isSignedIn} />
      <AllProducts />
      <Footer />
    </>
  );
}
