import { Metadata } from "next";
import Product from "./component/product";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import { GetCart } from "@/app/lib/action";
import { getSessionData } from "@/app/lib/session";

export const metadata: Metadata = {
  title: "Product - ", // use generate metadata params to make this more dynamic
  description: "TDA Ecommerce web site",
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
      <Product />
      <Footer />
    </>
  );
}
