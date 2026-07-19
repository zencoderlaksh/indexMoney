import React, { useState } from "react";
import { ShieldCheck, UploadCloud, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { kycDocuments } from "./data/dummyData";

const KYCPage = () => {
  const [documents, setDocuments] = useState(kycDocuments);

  const handleUpload = (id) => {
    // Dummy upload action
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, status: "pending", file: "uploaded_file.pdf", date: new Date().toISOString().split("T")[0] }
          : doc
      )
    );
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#48cae4] mb-2">
          Dashboard
        </p>
        <h1 className="text-4xl font-serif font-bold text-white">KYC & Verification</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#000d26] p-6 lg:p-8 mb-8">
        <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Verification Documents</h2>
            <p className="text-sm text-white/60">
              Please provide the following documents to complete your KYC and unlock all features.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">75% Complete</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <FileText className="h-5 w-5 text-[#48cae4]" />
                  </div>
                  <h3 className="font-semibold text-white">{doc.name}</h3>
                </div>
                {doc.status === "verified" && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </span>
                )}
                {doc.status === "pending" && (
                  <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Reviewing
                  </span>
                )}
                {doc.status === "missing" && (
                  <span className="bg-rose-500/20 text-rose-400 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> Required
                  </span>
                )}
              </div>

              {doc.file ? (
                <div className="text-sm text-white/60">
                  Uploaded {doc.file} on {doc.date}
                </div>
              ) : (
                <button
                  onClick={() => handleUpload(doc.id)}
                  className="w-full mt-2 border border-dashed border-white/20 hover:border-[#48cae4]/50 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-colors group"
                >
                  <UploadCloud className="h-6 w-6 text-white/40 group-hover:text-[#48cae4] transition-colors" />
                  <span className="text-sm text-white/60 group-hover:text-white transition-colors">Click to upload</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KYCPage;
