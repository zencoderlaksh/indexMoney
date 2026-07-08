import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Briefcase, FileCheck, MessageSquare, User } from "lucide-react";

const NAV_ITEMS = [
  { label: "Overview", path: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Portfolio", path: "/dashboard/portfolio", icon: Briefcase },
  { label: "KYC", path: "/dashboard/kyc", icon: FileCheck },
  { label: "Enquiries", path: "/dashboard/enquiries", icon: MessageSquare },
  { label: "Profile", path: "/dashboard/profile", icon: User },
];

const DashboardLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#001233] text-white">
      {/* Top Navigation Bar for Dashboard */}
      <div className="border-b border-white/10 bg-[#000d26]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 border-b-2 px-1 py-5 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? "border-[#48cae4] text-[#48cae4]"
                        : "border-transparent text-white/70 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
