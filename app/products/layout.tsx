import Footer from "@/app/component/Footer";
import Header from "@/app/component/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TDA",
  description: "TDA Ecommerce web site",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
