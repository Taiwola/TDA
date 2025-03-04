// app/page.tsx
"use server";
import FeatureSection from "./component/Feature_section";
import Hero from "./component/hero";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { getSessionData } from "@/app/lib/session"; // Import server action
import { GetCart } from "./lib/action";

export default async function Home() {
  // Fetch session token server-side
  const token = await getSessionData("token");
  const isSignedIn = !!token; // Convert to boolean
  const cartResult = await GetCart();
  const initialCart = cartResult.success ? cartResult.cart : [];

  return (
    <>
      <Header isSignedIn={isSignedIn} initialCart={initialCart} />
      <Hero />
      <FeatureSection />
      <Footer />
    </>
  );
}
