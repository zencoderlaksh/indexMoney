import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>We value your privacy and keep your personal information secure.</p>
        <p>
          Information collected such as Name, Mobile Number, Email ID, PAN
          details, and Address will only be used for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Demat account opening process</li>
          <li>KYC verification</li>
          <li>Customer support</li>
          <li>Investment and financial service updates</li>
        </ul>
        <p>
          We do not sell or share your personal data with unauthorized third
          parties.
        </p>
        <p>
          Your information is protected as per applicable data protection and
          compliance guidelines.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
