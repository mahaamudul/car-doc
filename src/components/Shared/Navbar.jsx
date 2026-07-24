"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Search, ShoppingCart } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const navItems = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "About",
            link: "/about",
        },
        {
            name: "Services",
            link: "/services",
        },
        {
            name: "My Bookings",
            link: "/my-bookings",
        },
        {
            name: "Blog",
            link: "/blog",
        },
        {
            name: "Contact",
            link: "/contact",
        }
    ]

    const session=useSession()
    console.log(session);

  return (
    <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar container mx-auto px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <div tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          > 
            {navItems.map((item, index) => (
                <Link key={index} href={item.link} className="btn btn-ghost lg:hidden">
                    {item.name}
                </Link>
            ))}
          </div>
        </div>
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={60}
            height={30}
          ></Image>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="flex items-center space-x-4">
            {navItems.map((item, index) => (
                <Link key={index} href={item.link} className="font-semibold hover:text-primary duration-300 hover:underline ">
                    {item.name}
                </Link>
            ))}
        </div>
      </div>
      <div className="navbar-end space-x-4">
        <div className="flex items-center space-x-4">
            <ShoppingCart  />
            <Search />
        </div>
        
        <a className="btn btn-outline btn-primary px-">Appointment</a>
        {!session.data?.user ? (
            <Link href="/login" className="btn btn-primary">Login</Link>
        ):(<button className="btn btn-primary" onClick={() => signOut()}>Logout</button>)}
      </div>
    </div>
    </div>
  );
};

export default Navbar;
