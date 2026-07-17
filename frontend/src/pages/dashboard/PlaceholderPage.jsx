import React from "react";

const PlaceholderPage = ({ title }) => {
  return (
    <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
      <h2 className="mb-3 font-serif text-3xl font-bold">{title}</h2>
      <p className="max-w-md text-sm leading-relaxed text-white/60">
        This section is currently under development and will be available soon.
      </p>
    </div>
  );
};

export default PlaceholderPage;
