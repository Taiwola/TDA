"use client";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export const NavLink: FC<NavLinkProps> = ({ href, children }) => {
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
