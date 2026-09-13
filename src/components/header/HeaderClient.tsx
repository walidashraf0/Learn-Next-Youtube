"use client";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import Navbar from "../Navbar/Navbar";

const HeaderClient = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 bg-white/95 w-full backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="text-2xl font-bold text-gray-600">WEGO ZAIN</span>
          </Link>
          <Navbar />
          <button
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <MdClose className="w-6 h-6" />
            ) : (
              <IoMenu className="w-6 h-6" />
            )}
          </button>

          {children}
        </div>
        {isOpen && (
          <nav className="md:hidden flex items-center flex-col space-y-3 mt-4 pb-4">
            <Link
              className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
              href={"/about"}
            >
              About
            </Link>
            <Link
              className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
              href={"/posts"}
            >
              Posts
            </Link>
            <Link
              className="text-gray-700 hover:text-blue-600 transition-colors capitalize"
              href={"/contact"}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default HeaderClient;
