import { Wrench, Calendar, DollarSign, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here is whats happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
            <h3 className="text-2xl font-bold">$12,450</h3>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Bookings</p>
            <h3 className="text-2xl font-bold">128</h3>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
            <Wrench size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Active Services</p>
            <h3 className="text-2xl font-bold">14</h3>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl border border-base-300 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-info/10 text-info flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Customers</p>
            <h3 className="text-2xl font-bold">96</h3>
          </div>
        </div>
      </div>
    </div>
  );
}