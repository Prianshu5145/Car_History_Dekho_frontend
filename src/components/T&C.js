import React from 'react';
import Navbar from './navbar';
const TermsAndConditions = () => {
  return (
    <div>
    <Navbar />
    <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-semibold mb-4">Terms and Conditions</h1>
    <p className="mb-4"><strong>Effective Date:</strong> 10/05/2025</p>
    <section className="space-y-4">
      <h2 className="text-2xl font-medium">1. Acceptance of Terms</h2>
      <p>By accessing and using our services, you agree to be bound by these Terms and Conditions and our Privacy Policy.</p>

      {/* <h2 className="text-2xl font-medium">2. Services Provided</h2>
      <p>We provide vehicle history information to verified dealers using data from third-party registered companies.</p> */}

      <h2 className="text-2xl font-medium">3. Dealer Verification</h2>
      <p>Dealers must register and be verified to access our services. Verification includes consent to our data processing terms.</p>

      <h2 className="text-2xl font-medium">4. Use Restrictions</h2>
      <p>Services are to be used solely for legitimate business purposes. Unauthorized use or distribution of data is prohibited.</p>

      <h2 className="text-2xl font-medium">5. Limitation of Liability</h2>
      <p>We are not liable for any inaccuracies in the data provided.</p>
      {/* by third-party registered companies. */}

      <h2 className="text-2xl font-medium">6. Modifications to Terms</h2>
      <p>We reserve the right to modify these Terms at any time. Continued use of our services constitutes acceptance of the new Terms.</p>

      <h2 className="text-2xl font-medium">7. Governing Law</h2>
      <p>These Terms are governed by the laws of India.</p>

      <h2 className="text-2xl font-medium">8. Contact Us</h2>
      <p>For any questions regarding these Terms, please contact us at team@carhistorydekho.com.</p>
    </section>
  </div></div>
  );
};

export default TermsAndConditions;
