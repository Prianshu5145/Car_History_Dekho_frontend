import React from 'react';
import Navbar from './navbar';

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-lg text-gray-700 mb-4"><strong>Effective Date:</strong> 10/05/2025</p>
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
            <p className="text-gray-800 leading-relaxed">
              Car History Dekho ("we", "our", or "us") is committed to protecting the privacy of our users. This Privacy Policy outlines how we handle data in compliance with the Digital Personal Data Protection Act, 2023 (DPDPA).
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. Purpose of Data Processing</h2>
            <ul className="list-disc pl-6 text-gray-800">
              <li><strong>Strictly for Verification:</strong> We process data exclusively to verify vehicle history for business purposes and prevent fraudulent activities.</li>
              <li><strong>No Data Storage:</strong> We do not store any data on our servers. All data processing is conducted in real-time.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Data Sources</h2>
            <p className="text-gray-800 leading-relaxed">
              We obtain data from third-party registered companies that are authorized to provide vehicle verification information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Data Sharing</h2>
            <p className="text-gray-800 leading-relaxed">
              Processed data is shared only with verified and registered dealers who have consented to our terms. We do not sell or share data with any unauthorized third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">5. User Rights</h2>
            <ul className="list-disc pl-6 text-gray-800">
              <li><strong>Right to Access:</strong> Know what data is processed.</li>
              <li><strong>Right to Correction:</strong> Request corrections to inaccurate data.</li>
              <li><strong>Right to Erasure:</strong> Request deletion of data.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">6. Security Measures</h2>
            <p className="text-gray-800 leading-relaxed">
              We implement appropriate technical and organizational measures to ensure data security and prevent unauthorized access. All data is served securely over HTTPS and protected by Cloudflare for frontend security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">7. Changes to This Policy</h2>
            <p className="text-gray-800 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">8. Contact Us</h2>
            <p className="text-gray-800 leading-relaxed">
              For any questions regarding this Privacy Policy, please contact us at <a href="mailto:team@carhistorydekho.com" className="text-blue-600 hover:underline">team@carhistorydekho.com</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
