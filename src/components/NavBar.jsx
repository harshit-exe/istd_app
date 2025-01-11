"use client";
import React, { useState, useCallback, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const NavItem = ({ href, children }) => (
  <Link
    href={href}
    className="text-gray-600 transition-colors duration-200 flex items-center hover:underline hover:text-purple-500"
  >
    {children}
    <ChevronDown className="ml-1 h-4 w-4" />
  </Link>
);



export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIslogin] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleLogout = () => {
    // router.push('/')
    localStorage.clear()
  }

  useEffect(() => {
   if (localStorage.getItem('token')) {
    setIslogin(true)
   }
  }, [])
  

  return (
    <header className="relative px-20 py-3 z-10">
      <div className="flex justify-between items-center p-4 mx-auto">
        <div className="text-2xl font-bold text-indigo-500">Campus++</div>
        <nav className="hidden md:flex space-x-8 lg:space-x-16">

        </nav>
        {isLogin ? <>

          <div className="hidden md:flex gap-5 space-x-2">
            <Button className="p-5 rounded-xl" variant="outline" asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </Button>
            <Button onClick={handleLogout} className="bg-indigo-500 rounded-xl border-none text-white  p-5" variant="outline" asChild>
              LogOut
            </Button>
          </div></> : <>

          <div className="hidden md:flex gap-5 space-x-2">
            <Button className="p-5 rounded-xl" variant="outline" asChild>
              <Link href={"/login"}>Login</Link>
            </Button>
            <Button className="bg-indigo-500 rounded-xl border-none text-white  p-5" variant="outline" asChild>
              <Link href={"/login"}>Get Started</Link>
            </Button>
          </div>
        </>}
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 bg-white shadow-md p-4 md:hidden"
        >
          <nav className="flex flex-col space-y-4">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/courses">Course</NavItem>
            <NavItem href="/dashboard">Dashboard</NavItem>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Dashboard
            </a>
          </nav>
          <div className="mt-4 space-y-2">
            <Button variant="outline" className="w-full">
              <Link href={"/auth"}>Sign in</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
