import React from "react";

const Disclaimer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          Investment in securities market are subject to market risks. Please
          read all the related documents carefully before investing.
        </p>
        <p>
          Demat account opening and investment services are subject to approval
          and KYC verification as per SEBI and exchange guidelines.
        </p>
        <p>
          Returns are not guaranteed. Past performance is not indicative of
          future results.
        </p>
        <p>
          We do not provide any assured profit or guaranteed return schemes.
        </p>
        <p>
          By submitting your details, you agree to be contacted via call, SMS,
          email, or WhatsApp regarding account opening and financial services.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
