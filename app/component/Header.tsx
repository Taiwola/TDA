"use client";
import { ShoppingCart } from "lucide-react";
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
              {/* <span className="font-bold text-xl text-gray-800">Your Brand</span> */}
            </div>
          </Link>

          <nav className="flex items-center gap-8">
            <NavLink href="/products">All</NavLink>
            <NavLink href="/">Kaftans</NavLink>
            <NavLink href="/about">Agbada</NavLink>
            <NavLink href="/about">Footwears</NavLink>
            <NavLink href="/about">Catalogue</NavLink>
          </nav>
        </div>

        <nav className="flex items-center">
          <Search />
        </nav>

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
      </div>
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
