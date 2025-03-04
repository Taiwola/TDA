"use client";
import { Button } from "@heroui/react";
import React from "react";
import { Bell, Menu } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapse } from "@/state";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollasped = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSideBar = () => {
    dispatch(setIsSidebarCollapse(!isSidebarCollasped));
  };
  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* left side */}
      <div className="flex justify-between items-center gap-5">
        <Button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-burntgold"
          onPress={() => {
            toggleSideBar();
          }}
        >
          <Menu className="w-4 h-4" />
        </Button>

        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search products"
            className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-burntgold"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex items-center justify-between gap-5">
        <div className="hidden md:flex ">
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-burntgold rounded-full">
              1
            </span>
          </div>
          <hr className="w-0 h-7 border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <span className="font-semibold">seun Olanitori</span>
          </div>
        </div>
      </div>
    </div>
  );
};
