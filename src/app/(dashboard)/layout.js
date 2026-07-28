import Link from "next/link";
import { LayoutDashboard, Wrench, Calendar, Users, ArrowLeft } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-base-200">
      {/* SIDEBAR */}
      <aside className="w-64 bg-base-100 border-r border-base-300 flex flex-col justify-between p-4 hidden md:flex sticky top-0 h-screen">
        <div>
          <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold px-4 py-3">
            <span className="text-primary">Car Doctor</span> Admin
          </Link>

          <nav className="mt-6 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition font-medium"
            >
              <LayoutDashboard size={18} /> Overview
            </Link>
            <Link
              href="/dashboard/services"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition font-medium"
            >
              <Wrench size={18} /> Manage Services
            </Link>
            <Link
              href="/dashboard/bookings"
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-base-200 transition font-medium"
            >
              <Calendar size={18} /> All Bookings
            </Link>
          </nav>
        </div>

        <div className="border-t border-base-200 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-primary transition"
          >
            <ArrowLeft size={16} /> Back to Public Site
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-base-100 border-b border-base-300 px-6 flex items-center justify-between sticky top-0 z-40">
          <h1 className="text-lg font-bold">Admin Portal</h1>
          <div className="badge badge-primary font-semibold">Admin Area</div>
        </header>

        <main className="p-6 md:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}