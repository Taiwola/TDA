"use client";
import { useState } from "react";
import { ShoppingCart, Menu } from "lucide-react"; // Import Menu icon for the hamburger
import Image from "next/image";
import Link from "next/link";
import { FC, ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CartPopoverContent from "./CartPopover";
import { Search } from "./Search";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <header className="bg-white border-b rounded-b-lg">
      <div className="container mx-auto py-2 flex items-center justify-between px-6">
        <div className="flex items-center justify-center gap-5">
          <Link href="/" passHref>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={100}
                height={60}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:inline-flex md:items-center md:gap-8">
            <NavLink href="/products">All Categories</NavLink>
            <NavLink href="/">Kaftans</NavLink>
            <NavLink href="/about">Agbada</NavLink>
            <NavLink href="/about">Footwears</NavLink>
            <NavLink href="/about">Catalogue</NavLink>
          </nav>
        </div>

        {/* Search Component - Hidden on Mobile, Visible on Desktop */}
        <nav className="hidden md:flex items-center">
          <Search />
        </nav>

        {/* Shopping Cart */}
        <div className="relative group">
          <Popover>
            <PopoverTrigger>
              <ShoppingCart
                className="cursor-pointer hover:text-muted-foreground transition-colors"
                width={30}
                height={30}
              />
              <span className="absolute top-0 right-0 inline-block bg-burntgold text-white rounded-full px-2 py-1 text-xs transform translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform">
                2
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <CartPopoverContent />
            </PopoverContent>
          </Popover>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Menu
            className="cursor-pointer hover:text-muted-foreground transition-colors"
            width={30}
            height={30}
            onClick={toggleMobileNav}
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileNavOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col items-center gap-4 py-4">
            <NavLink href="/products">All Categories</NavLink>
            <NavLink href="/">Kaftans</NavLink>
            <NavLink href="/about">Agbada</NavLink>
            <NavLink href="/about">Footwears</NavLink>
            <NavLink href="/about">Catalogue</NavLink>
          </nav>
        </div>
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
      className="text-muted-background text-sm font-normal hover:text-burntgold transition-colors relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burntgold transition-all group-hover:w-full"></span>
    </Link>
  );
};
