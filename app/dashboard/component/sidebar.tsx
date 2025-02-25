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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarCollasped = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSideBar = () => {
    dispatch(setIsSidebarCollapse(!isSidebarCollasped));
  };

  const sideBarClassNames = `fixed flex flex-col ${
    isSidebarCollasped ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all  duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
    <div className={sideBarClassNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollasped ? "px-5" : "px-8"
        }`}
      >
        <div>
          <Image src={"/images/logo.png"} alt="logo" width={30} height={30} />
        </div>
        <h1
          className={`${
            isSidebarCollasped ? "hidden" : "font-extrabold text-2xl"
          }`}
        ></h1>
        <Button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-burntgold"
          onPress={() => {
            toggleSideBar();
          }}
        >
          <Menu className="w-4 h4" />
        </Button>
      </div>

      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollasped}
        />
        <SidebarLink
          href="dashboard/catalogue"
          icon={Archive}
          label="Catalogue"
          isCollapsed={isSidebarCollasped}
        />
        <SidebarLink
          href="dashboard/product"
          icon={Clipboard}
          label="Product"
          isCollapsed={isSidebarCollasped}
        />
        <SidebarLink
          href="dashboard/orders"
          icon={ListOrdered}
          label="Orders"
          isCollapsed={isSidebarCollasped}
        />
        <SidebarLink
          href="dashboard/users"
          icon={User}
          label="Users"
          isCollapsed={isSidebarCollasped}
        />
        <SidebarLink
          href="dashboard/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollasped}
        />
      </div>

      {/* footer */}
      <div className={`${isSidebarCollasped ? "hidden" : "block"}`}>
        <p className="text-center text-xs text-gray-500">&copy;TDA</p>
      </div>
    </div>
  );
}

type SidebarlinkProps = {
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
}: SidebarlinkProps) => {
  const pathName = usePathname();
  const isActive =
    pathName == href || (pathName === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-white hover:bg-burntgold/20 gap-3 transition-colors ${
          isActive ? "bg-burntgold text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};
