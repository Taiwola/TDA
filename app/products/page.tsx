import { Metadata } from "next";
import AllProducts from "./component/allProducts";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";

export const metadata: Metadata = {
  title: "Products",
  description: "TDA Single Product",
};

export default function Page() {
  return (
    <>
      <Header />
      <AllProducts />
      <Footer />
    </>
  );
}
