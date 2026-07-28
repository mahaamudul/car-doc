"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Wrench, Calendar, Users, ArrowLeft } from "lucide-react";

const DashboardNav = ({ children }) => {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Add Service", href: "/dashboard/add-service", icon: LayoutDashboard },
    { name: "Manage Services", href: "/dashboard/manage-services", icon: Wrench },
    { name: "Manage Bookings", href: "/dashboard/manage-bookings", icon: Calendar },
    { name: "Users", href: "/dashboard/users", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* SIDEBAR */}
      <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col justify-between p-4 hidden md:flex sticky top-0 h-screen">
        <div>
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold px-4 py-3">
            <span className="text-primary">Car Doctor</span> Admin
          </Link>

          {/* Navigation Items */}
          <nav className="mt-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-base-content hover:bg-base-200"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Link */}
        <div className="border-t border-base-200 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-primary transition"
          >
            <ArrowLeft size={16} /> Back to Public Site
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-base-100 border-b border-base-300 px-6 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-lg font-bold">Admin Portal</h1>
          <div className="badge badge-primary font-semibold">Admin Area</div>
        </header>

        {/* Dynamic Children Content */}
        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardNav;