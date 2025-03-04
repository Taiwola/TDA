// component/Header.tsx
"use client";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import CartModalContent from "./CartPopover"; // Renamed from CartPopoverContent
import { Search } from "./Search";

interface HeaderProps {
  isSignedIn?: boolean;
}

export default function Header({ isSignedIn }: HeaderProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // State for modal

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  return (
    <header className="bg-white border-b rounded-b-lg shadow-sm">
      <div className="container mx-auto py-2 flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" passHref>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <Image src="/images/logo.png" alt="Logo" width={100} height={60} />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          <NavLink href="/products">All Categories</NavLink>
          <NavLink href="/">Kaftans</NavLink>
          <NavLink href="/about">Agbada</NavLink>
          <NavLink href="/about">Footwears</NavLink>
          <NavLink href="/about">Catalogue</NavLink>
        </nav>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <Search />
        </div>

        {/* Right Section: Cart, Sign In/Dashboard, Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Shopping Cart with Modal Trigger */}
          <div className="relative group">
            <button onClick={toggleCartModal} className="focus:outline-none">
              <ShoppingCart
                className="cursor-pointer hover:text-amber-700 transition-colors"
                width={28}
                height={28}
              />
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white rounded-full px-2 py-1 text-xs transform group-hover:scale-110 transition-transform">
                2
              </span>
            </button>
          </div>

          {/* Sign In or Dashboard Button (Desktop) */}
          <div className="hidden md:block">
            {isSignedIn ? (
              <NavLink href="/dashboard">Dashboard</NavLink>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 text-sm font-medium hover:text-amber-700 transition-colors px-4 py-2 rounded-md border border-gray-300 hover:border-amber-700"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={toggleMobileNav}>
            {isMobileNavOpen ? (
              <X className="w-8 h-8 text-gray-700 hover:text-amber-700 transition-colors" />
            ) : (
              <Menu className="w-8 h-8 text-gray-700 hover:text-amber-700 transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Fullscreen Overlay */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" passHref>
              <Image src="/images/logo.png" alt="Logo" width={80} height={48} />
            </Link>
            <button onClick={toggleMobileNav}>
              <X className="w-8 h-8 text-gray-700 hover:text-amber-700" />
            </button>
          </div>
          <div className="px-4 py-4">
            <Search />
          </div>
          <nav className="flex flex-col items-start gap-6 px-6 py-4 flex-1">
            <NavLink href="/products">All Categories</NavLink>
            <NavLink href="/">Kaftans</NavLink>
            <NavLink href="/about">Agbada</NavLink>
            <NavLink href="/about">Footwears</NavLink>
            <NavLink href="/about">Catalogue</NavLink>
            {isSignedIn ? (
              <NavLink href="/dashboard">Dashboard</NavLink>
            ) : (
              <Link
                href="/login"
                className="text-gray-700 text-base font-medium hover:text-amber-700 transition-colors py-2"
              >
                Sign In
              </Link>
            )}
          </nav>
          <div className="p-4 border-t text-center text-sm text-gray-500">
            © 2025 TDA
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={toggleCartModal}
          />
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-0 relative">
              <button
                onClick={toggleCartModal}
                className="absolute top-4 right-4 p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
              <CartModalContent />
            </div>
          </div>
        </>
      )}
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink: FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      passHref
      className="text-gray-700 text-base font-medium hover:text-amber-700 transition-colors relative group py-2"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all group-hover:w-full"></span>
    </Link>
  );
};
