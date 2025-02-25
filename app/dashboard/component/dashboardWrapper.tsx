"use client";
import StoreProvider, { useAppSelector } from "@/app/redux";
import React from "react";
import Sidebar from "./sidebar";
import { Navbar } from "./navbar";

export const DashLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollasped = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  return (
    <div className="flex min-h-screen bg-slate-50 w-full flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={`flex-1 flex-col flex w-full py-7 px-9 ${
          isSidebarCollasped ? "md:pl-24" : "md:pl-72"
        } bg-gray-50 overflow-y-auto`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export const DashboardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <StoreProvider>
      <DashLayout>{children}</DashLayout>
    </StoreProvider>
  );
};
