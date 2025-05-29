import React from 'react';
import Navbar from './navbar';
import { Helmet } from "react-helmet";
const DataProcessingAgreement = () => {
  return (
   <div>
   <Helmet>
     <meta name="robots" content="noindex, nofollow" />
   </Helmet> <Navbar /> <div className="max-w-4xl mx-auto p-6">
   <h1 className="text-3xl font-semibold mb-4">Data Processing Agreement (DPA)</h1>
   <p className="mb-4"><strong>Effective Date:</strong> 10/05/2025</p>
   <section className="space-y-4">
     <h2 className="text-2xl font-medium">1. Parties</h2>
     <p>This Data Processing Agreement ("Agreement") is between:</p>
     <ul className="list-disc pl-6">
       <li><strong>Data Controller:</strong> Car History Dekho</li>
       <li><strong>Data Processor:</strong> Verified Car Dealers</li>
     </ul>

     <h2 className="text-2xl font-medium">2. Purpose</h2>
     <p>The Processor will process data solely for the purpose of providing vehicle history information as requested by the Controller, for legitimate business purposes, and to prevent fraudulent activities.</p>

     <h2 className="text-2xl font-medium">3. Data Processing</h2>
     <p>The Processor shall process data only on documented instructions from the Controller. The Processor shall ensure that persons authorized to process the data have committed themselves to confidentiality.</p>

     <h2 className="text-2xl font-medium">4. Security Measures</h2>
     <p>The Processor shall implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk. All data is served securely over HTTPS, and Cloudflare is used for frontend security protection.</p>

     <h2 className="text-2xl font-medium">5. Sub-processors</h2>
     <p>The Processor shall not engage another processor without prior specific or general written authorization of the Controller.</p>

     <h2 className="text-2xl font-medium">6. Data Subject Rights</h2>
     <p>The Processor shall assist the Controller in responding to requests for exercising the data subject's rights.</p>

     <h2 className="text-2xl font-medium">7. Data Breach Notification</h2>
     <p>The Processor shall notify the Controller without undue delay after becoming aware of a data breach.</p>

     <h2 className="text-2xl font-medium">8. Termination</h2>
     <p>Upon termination of the Agreement, the Processor shall, at the choice of the Controller, delete or return all data.</p>

     <h2 className="text-2xl font-medium">9. Governing Law</h2>
     <p>This Agreement is governed by the laws of India.</p>

     <h2 className="text-2xl font-medium">10. Contact Information</h2>
     <p>For any questions regarding this Agreement, please contact us at team@carhistorydekho.com.</p>
   </section>
 </div></div>
  );
};

export default DataProcessingAgreement;
