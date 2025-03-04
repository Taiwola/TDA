import { Metadata } from "next";
import Login from "./component/login";
import Header from "@/app/component/Header";
import Footer from "@/app/component/Footer";
import { getSessionData } from "@/app/lib/session";

export const metadata: Metadata = {
  title: "Sign in",
  description: "TDA Login Page",
};

export default async function page() {
  // Fetch session token server-side
  const token = await getSessionData("token");
  const isSignedIn = !!token; // Convert to boolean
  return (
    <>
      <Header isSignedIn={isSignedIn} />
      <Login />
      <Footer />
    </>
  );
}
