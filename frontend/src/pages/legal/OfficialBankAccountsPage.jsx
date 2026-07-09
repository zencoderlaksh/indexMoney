import React from "react";
import { AlertCircle, Copy, CheckCircle2, ShieldAlert } from "lucide-react";

const OfficialBankAccountsPage = () => {
  const [copiedField, setCopiedField] = React.useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const bankDetails = {
    accountName: "Neha Soni Parwal",
    bankName: "Kotak Mahindra Bank",
    accountNumber: "0547365150",
    ifscCode: "KKBK0002049",
    homeBranch: "DHULE",
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16 pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header & Alert */}
        <div className="mb-10 text-center">
          <ShieldAlert className="w-12 h-12 text-[#0353a4] mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#001233] mb-4">
            Official Bank Accounts
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-left max-w-3xl mx-auto mt-6 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-800 font-bold mb-2">Important Security Alert</h3>
                <p className="text-red-700 text-sm leading-relaxed mb-4">
                  Please be aware that Index Money only accepts payments into the official bank accounts listed on this page. We will never ask you to transfer money to any personal or unlisted bank accounts. If anyone claiming to be from Index Money asks you to deposit money into a different account, please report it immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 text-sm font-semibold text-red-800 mt-4 bg-red-100/50 p-3 rounded-xl inline-flex">
                  <span>📞 Neha: +91 92700 69221</span>
                  <span className="hidden sm:inline">•</span>
                  <span>✉️ infoindexmoney@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          {/* Left Card: Bank Transfer Details */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#001233] mb-8 border-b border-slate-100 pb-4">
              Bank Transfer Details
            </h2>
            
            <div className="space-y-6">
              {[
                { label: "Account Name", value: bankDetails.accountName, id: "name" },
                { label: "Bank Name", value: bankDetails.bankName, id: "bank" },
                { label: "Account Number", value: bankDetails.accountNumber, id: "acc" },
                { label: "IFSC Code", value: bankDetails.ifscCode, id: "ifsc" },
                { label: "Home Branch", value: bankDetails.homeBranch, id: "branch" },
              ].map((item) => (
                <div key={item.id} className="flex justify-between items-center group">
                  <div>
                    <p className="text-sm font-semibold text-[#0353a4] mb-1">{item.label}</p>
                    <p className="text-slate-700 font-medium">{item.value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(item.value, item.id)}
                    className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-[#0353a4] transition-colors"
                    title={`Copy ${item.label}`}
                  >
                    {copiedField === item.id ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card: UPI / QR Code */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-[#001233] mb-8 border-b border-slate-100 pb-4">
              UPI / QR Code
            </h2>
            
            <div className="mb-8 flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-[#0353a4] mb-1">UPI ID</p>
                <p className="text-slate-700 font-medium">9270069221@kotakbank</p>
              </div>
              <button
                onClick={() => copyToClipboard("9270069221@kotakbank", "upi")}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-[#0353a4] transition-colors"
                title="Copy UPI ID"
              >
                {copiedField === "upi" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="bg-[#b3143f] rounded-2xl p-6 text-center text-white relative overflow-hidden shadow-lg border border-[#8a0f30]">
              <div className="mb-4 flex items-center justify-center gap-2">
                <span className="font-bold text-xl tracking-tight">kotak</span>
                <div className="flex gap-0.5">
                  <div className="w-1.5 h-4 bg-white rounded-full"></div>
                  <div className="w-1.5 h-4 bg-white rounded-full"></div>
                  <div className="w-1.5 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <p className="text-sm mb-4 text-white/90">Scan to pay with any UPI app</p>
              
              <div className="bg-white p-4 rounded-xl inline-block mb-4 shadow-md w-full max-w-[200px] aspect-square flex items-center justify-center mx-auto border-4 border-white">
                {/* Temporary placeholder for QR code, can be replaced by actual image */}
                <div className="w-full h-full border-4 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400 flex-col gap-2 bg-slate-50">
                  <span className="text-xs font-semibold text-center px-2">Please upload the actual QR code image here</span>
                </div>
              </div>
              
              <p className="font-bold tracking-wider mb-2 text-sm">NEHA SONI PARWAL</p>
              <p className="text-xs text-white/80">UPI ID: 9270069221@kotakbank</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficialBankAccountsPage;
