import React from "react";
import { useAuthStore } from "../../stores/authStore";
import { Edit2 } from "lucide-react";

const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#48cae4] mb-2">
          Your Account
        </p>
        <h1 className="text-4xl font-serif font-bold text-white">Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details Card */}
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white">Personal details</h2>
            <button className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/5 transition-colors">
              <Edit2 className="h-4 w-4" />
              Edit
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">Name</span>
              <span className="font-semibold text-white">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">Email</span>
              <span className="font-semibold text-white">{user?.email}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">Mobile</span>
              <span className="font-semibold text-white">{user?.mobileNumber || "-"}</span>
            </div>

            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">PAN</span>
              <span className="font-semibold text-white">{user?.pan || "-"}</span>
            </div>
          </div>
        </div>

        {/* Sign-in & Security Card */}
        <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Sign-in & security</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Your account is protected by <span className="font-semibold text-white">one-time passwords (OTP)</span> sent to your email — there's no password to remember or leak.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">Sign-in method</span>
              <span className="font-semibold text-white">Email OTP</span>
            </div>

            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <span className="text-white/60 text-sm">KYC status</span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
