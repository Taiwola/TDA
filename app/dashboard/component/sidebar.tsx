"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapse } from "@/state";
import { Button } from "@heroui/react";
import {
  Archive,
  Clipboard,
  Layout,
  ListOrdered,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
  LogOut, // Added LogOut icon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { clearSession } from "@/app/lib/session";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSideBar = () => {
    dispatch(setIsSidebarCollapse(!isSidebarCollapsed));
  };

  const handleLogout = async () => {
    await clearSession();
    router.push("/login");
  };

  const sideBarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sideBarClassNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <div>
          <Image src="/images/logo.png" alt="logo" width={30} height={30} />
        </div>
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block font-extrabold text-2xl"
          }`}
        >
          {/* Add your app name here if needed */}
        </h1>
        <Button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-burntgold"
          onPress={toggleSideBar}
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/catalogue"
          icon={Archive}
          label="Catalogue"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/product"
          icon={Clipboard}
          label="Product"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/orders"
          icon={ListOrdered}
          label="Orders"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* Logout and Footer Section */}
      <div className="mt-auto p-4">
        <Button
          className={`w-full flex items-center justify-start gap-3 px-4 py-2 text-gray-700 hover:bg-burntgold hover:text-white transition-colors ${
            isSidebarCollapsed ? "justify-center" : ""
          }`}
          onPress={handleLogout}
        >
          <LogOut className="w-6 h-6" />
          <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>
            Logout
          </span>
        </Button>
        <div className={`${isSidebarCollapsed ? "hidden" : "block"} mt-4`}>
          <p className="text-center text-xs text-gray-500">©TDA</p>
        </div>
      </div>
    </div>
  );
}

type SidebarLinkProps = {
  href: string;
  label: string;
  isCollapsed: boolean;
  icon: LucideIcon;
};

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-white hover:bg-burntgold/20 gap-3 transition-colors ${
          isActive ? "bg-burntgold text-white" : ""
        }`}
      >
        <Icon
          className={`w-6 h-6 ${isActive ? "!text-white" : "!text-gray-700"}`}
        />
        <span
          className={`${isCollapsed ? "hidden" : "block"} font-medium ${
            isActive ? "text-white" : "text-gray-700"
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};
