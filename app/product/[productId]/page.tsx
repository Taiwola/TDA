import { Metadata } from "next";
import Product from "./component/product";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";

export const metadata: Metadata = {
  title: "Product - ", // use generate metadata params to make this more dynamic
  description: "TDA Ecommerce web site",
};

export default function Page() {
  return (
    <>
      <Header />
      <Product />
      <Footer />
    </>
  );
}
