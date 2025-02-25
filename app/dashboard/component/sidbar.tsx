"use client";
import React, { useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { FaBars } from "react-icons/fa";

const Sidbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      {isMobile && (
        <div
          className="fixed top-5 left-5 p-2 bg-gray-800 text-white rounded-lg cursor-pointer z-50"
          onClick={toggleMobileMenu}
        >
          <FaBars size={24} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-5 transition-transform duration-300 ease-in-out ${
          isMobile
            ? isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      >
        <ul className="space-y-4">
          <li className="hover:text-gray-400 cursor-pointer">Dashboard</li>
          <li className="hover:text-gray-400 cursor-pointer">Profile</li>
          <li className="hover:text-gray-400 cursor-pointer">Settings</li>
          <li className="hover:text-gray-400 cursor-pointer">Logout</li>
        </ul>
      </div>

      {/* Overlay for Mobile */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Sidbar;
