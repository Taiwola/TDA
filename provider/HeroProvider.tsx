"use client";
// HeroProvider.tsx
import * as React from "react";
import { HeroUIProvider } from "@heroui/react";

export default function HeroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
