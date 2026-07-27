"use client";



import Image from "next/image";

import Link from "next/link";

import React, { useState, useEffect } from "react";

import { Search, ShoppingCart, User, LogOut, CalendarCheck } from "lucide-react";

import { signOut, useSession } from "next-auth/react";

import { usePathname, useRouter } from "next/navigation";

import { toast } from "sonner";



const Navbar = () => {

  const pathname = usePathname();

  const router = useRouter();

  const { data: session, status } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);



  // Track scroll position to trigger transparency

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 20) {

        setIsScrolled(true);

      } else {

        setIsScrolled(false);

      }

    };



    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);



  const handleSignOut = async () => {

    await signOut({ redirect: false });

    toast.success("Signed out successfully");

    router.push("/");

    router.refresh();

  };



  const navItems = [

    { name: "Home", link: "/" },

    { name: "About", link: "/about" },

    { name: "Services", link: "/services" },

    { name: "Blog", link: "/blog" },

    { name: "Contact", link: "/contact" },

  ];



  if (session?.user) {

    const servicesIndex = navItems.findIndex((item) => item.name === "Services");

    navItems.splice(servicesIndex + 1, 0, {

      name: "My Bookings",

      link: "/my-bookings",

    });

  }



  return (

    <header

      className={`sticky top-0 z-50 transition-all duration-300 ${

        isScrolled

          ? "bg-base-100/80 backdrop-blur-md shadow-md py-1"

          : "bg-base-100 shadow-sm py-2"

      }`}

    >

      <div className="navbar container mx-auto px-4 lg:px-10 min-h-0 h-16">

       

        {/* BRAND & MOBILE MENU TRIGGER */}

        <div className="navbar-start">

          <div className="dropdown">

            <div

              tabIndex={0}

              role="button"

              className="btn btn-ghost btn-xs sm:btn-sm lg:hidden pr-2"

              aria-label="Open navigation menu"

            >

              <svg

                xmlns="http://www.w3.org/2000/svg"

                className="h-5 w-5"

                fill="none"

                viewBox="0 0 24 24"

                stroke="currentColor"

              >

                <path

                  strokeLinecap="round"

                  strokeLinejoin="round"

                  strokeWidth="2"

                  d="M4 6h16M4 12h8m-8 6h16"

                />

              </svg>

            </div>



            {/* Mobile Navigation Dropdown */}

            <ul

              tabIndex={0}

              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-2 w-52 p-2 shadow-lg border border-base-200"

            >

              {navItems.map((item) => (

                <li key={item.link}>

                  <Link

                    href={item.link}

                    className={pathname === item.link ? "active text-primary font-bold" : ""}

                  >

                    {item.name}

                  </Link>

                </li>

              ))}

            </ul>

          </div>



          {/* Logo */}

          <Link href="/" className="flex items-center">

            <Image

              src="/assets/logo.svg"

              alt="Car Doctor Logo"

              width={65}

              height={32}

              priority

            />

          </Link>

        </div>



        {/* DESKTOP NAVIGATION */}

        <div className="navbar-center hidden lg:flex">

          <ul className="flex items-center space-x-6 text-sm">

            {navItems.map((item) => {

              const isActive = pathname === item.link;

              return (

                <li key={item.link}>

                  <Link

                    href={item.link}

                    className={`font-medium transition-colors duration-200 ${

                      isActive

                        ? "text-primary border-b-2 border-primary pb-0.5"

                        : "text-base-content hover:text-primary"

                    }`}

                  >

                    {item.name}

                  </Link>

                </li>

              );

            })}

          </ul>

        </div>



        {/* RIGHT SIDE ACTIONS */}

        <div className="navbar-end space-x-2">

          {/* Quick Search */}

          <button className="btn btn-ghost btn-circle btn-sm" aria-label="Search">

            <Search className="w-4 h-4 text-gray-700" />

          </button>



          {/* Cart Icon - ONLY SHOWS AFTER LOGIN */}

          {session?.user && (

            <button className="btn btn-ghost btn-circle btn-sm relative" aria-label="Shopping Cart">

              <ShoppingCart className="w-4 h-4 text-gray-700" />

            </button>

          )}



          {/* Appointment CTA */}

          <Link href="/services" className="btn btn-outline btn-primary btn-sm hidden sm:inline-flex h-9 min-h-0">

            Appointment

          </Link>



          {/* Auth State (Login / Compact User Dropdown) */}

          {status === "loading" ? (

            <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>

          ) : session?.user ? (

            <div className="dropdown dropdown-end">

              <div

                tabIndex={0}

                role="button"

                className="btn btn-ghost btn-circle btn-sm avatar"

              >

                <div className="w-8 h-8 rounded-full ring-1 ring-primary ring-offset-base-100 ring-offset-1">

                  {session.user.image ? (

                    <Image

                      src={session.user.image}

                      alt="User Avatar"

                      width={32}

                      height={32}

                    />

                  ) : (

                    <div className="bg-primary text-primary-content flex items-center justify-center h-full w-full font-bold text-xs">

                      {session.user.name ? session.user.name[0].toUpperCase() : <User size={16} />}

                    </div>

                  )}

                </div>

              </div>



              {/* Cleaned Up Dropdown Menu */}

              <ul

                tabIndex={0}

                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-2 w-48 p-2 shadow-xl border border-base-200"

              >

                <li>

                  <Link href="/profile" className="flex items-center gap-2">

                    <User size={16} /> Profile

                  </Link>

                </li>

                <li>

                  <Link href="/my-bookings" className="flex items-center gap-2">

                    <CalendarCheck size={16} /> My Bookings

                  </Link>

                </li>

                <li className="border-t border-base-200 mt-1 pt-1">

                  <button

                    onClick={handleSignOut}

                    className="flex items-center gap-2 text-error hover:bg-error/10 w-full text-left"

                  >

                    <LogOut size={16} /> Logout

                  </button>

                </li>

              </ul>

            </div>

          ) : (

            <Link href="/login" className="btn btn-primary btn-sm h-9 min-h-0">

              Login

            </Link>

          )}

        </div>



      </div>

    </header>

  );

};



export default Navbar; 

