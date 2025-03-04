import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeroProvider from "@/provider/HeroProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TDA Retails",
  description: "TDA Ecommerce web site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <HeroProvider>{children}</HeroProvider>
      </body>
    </html>
  );
}
