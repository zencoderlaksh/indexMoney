import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Briefcase, FileCheck, MessageSquare, User } from "lucide-react";

import { useAuthStore } from "../../stores/authStore";

const COMMON_NAV = [
  { label: "Overview", path: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Portfolio", path: "/dashboard/portfolio", icon: Briefcase },
  { label: "KYC", path: "/dashboard/kyc", icon: FileCheck },
  { label: "Enquiries", path: "/dashboard/enquiries", icon: MessageSquare },
];

const PARTNER_NAV = [
  { label: "Transactions", path: "/dashboard/transactions", icon: Briefcase },
  { label: "Invoices", path: "/dashboard/invoices", icon: FileCheck },
];

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useAuthStore();

  const isPartner = user?.isPartner;
  const isVerified = user?.partnerStatus === "verified";

  const navItems = isPartner 
    ? [...COMMON_NAV, ...PARTNER_NAV, { label: "Profile", path: "/dashboard/profile", icon: User }] 
    : [...COMMON_NAV, { label: "Profile", path: "/dashboard/profile", icon: User }];

  return (
    <div className="min-h-screen bg-[#001233] text-white">
      {/* Top Navigation Bar for Dashboard */}
      <div className="border-b border-white/10 bg-[#000d26]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center gap-8">
            <h1 className="text-xl font-bold text-[#48cae4] hidden md:block">
              {isPartner ? "Partner Dashboard" : "User Dashboard"}
              {isPartner && !isVerified && (
                <span className="ml-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-normal">Pending</span>
              )}
            </h1>
            <div className="flex flex-1 items-center gap-8 overflow-x-auto no-scrollbar">
              {navItems.map((item) => {
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
