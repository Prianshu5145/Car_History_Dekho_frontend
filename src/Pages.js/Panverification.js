import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import MobileMenu from "../components/MobileMenu";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const PanResponse = () => {
  const [PanNumber, setPanNumber] = useState("");


  
  
  
 
   const generateChallanPDF = (data) => {
      const result = data.data.result;
    
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [210, 340], // Custom tall size
      });
    
      doc.setFontSize(24);
      doc.text(`PAN  Verification Report`, 14, 15);
    
      doc.setFontSize(13);
      autoTable(doc, {
        startY: 25,
        head: [[{ content: 'PAN Details', colSpan: 2, styles: { halign: 'left' } }]],
        body: [
          
          ['PAN Number :', result.PAN || '-'],
  ['First Name :', result.FIRST_NAME || '-'],
  ['Middle Name :', result.MIDDLE_NAME || '-'],
  ['Last Name :', result.LAST_NAME || '-'],
  ['Masked Aadhaar Number :', result.AADHAR_NUM || '-'],
  ['Is Aadhaar Linked? :', result.AADHAR_LINKED || '-'],
  
  ['Date of Birth :', result.DOB || '-'],
  ['Gender :', result.GENDER || '-'],
  ['Identity Type :', result.IDENTITY_TYPE || '-'],
  ['Address Line 1 :', result.ADDRESS_1 || '-'],
  ['Address Line 2 :', result.ADDRESS_2 || '-'],
  ['Address Line 3 :', result.ADDRESS_3 || '-'],
  ['Pincode :', result.PINCODE || '-'],
  ['City :', result.CITY || '-'],
  ['State :', result.STATE || '-'],
  ['Country :', result.COUNTRY || '-'],
        ],
        theme: 'grid',
        styles: { cellPadding: 4, fontSize: 10, halign: 'left' },
       headStyles: { 
      fillColor: [0, 112, 192], 
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 12,
      halign: 'left',
      lineColor: [0, 0, 0], 
      lineWidth: 0.2 
    },
  
        bodyStyles: { textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.1 },
        tableWidth: 'auto',
        columnStyles: {
      0: { cellWidth: 53 }, // Adjust width of first column as needed
    },
    didParseCell: function (data) {
      if (data.row.index === 0) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fontSize = 11; // Bold header
      }
      
     
    },
      });
    
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    };
  
  const [errorInfo, setErrorInfo] = useState(null);





  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/service/call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          PanNumber,
          serviceName: "PAN Verification",
        }),
      });
    
      if (!response.ok) {
        if (response.status === 402) {
          setErrorInfo({
            type: 'payment',
            message: <p className="text-lg text-gray-800">
            Insufficient balance.
            <br />
            <strong> Please recharge your wallet.</strong>
          </p>,
          });
        } else if (response.status === 401) {
          setErrorInfo({
            type: 'auth',
            message: <p className="text-lg text-gray-800">
            Session expired.
            <br />
            <strong>Please login again.</strong>
          </p>
          ,
          });
        } else {
          setErrorInfo({
            type: 'generic',
            message: 'Something went wrong. Please try again later.',
          });
        }
        return;
      }
    
      const data = await response.json();
      
      generateChallanPDF(data);
    } catch (error) {
      
      setErrorInfo({
        type: 'generic',
        message: 'Network or server error. Please try again.',
      });
    }
    
        
  };

  return (
    
   <div className="min-h-screen bg-white lg:pl-[19.2rem]"> <Sidebar/>
   <MobileMenu/>
   <Header/>
   {errorInfo && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="bg-white border-l-8 border-red-500 rounded-2xl shadow-2xl w-full max-w-2xl mx-6 p-8 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>
        <p className="text-lg text-gray-800">{errorInfo.message}</p>
      </div>

      <div className="flex justify-end space-x-4">
        {errorInfo.type === 'payment' && (
          <button
            onClick={() => window.location.href = '/Payment-Page'}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Recharge Wallet
          </button>
        )}
        {errorInfo.type === 'auth' && (
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        )}
        {(errorInfo.type === 'generic' || errorInfo.type === 'payment' || errorInfo.type === 'auth') && (
          <button
            onClick={() => setErrorInfo(null)}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
          >
            Close
          </button>
        )}
      </div>
    </div>
  </div>
)}
<div className="px-4 sm:px-8 py-6 flex  lg:max-w-screen lg:bg-white   lg:p-0 lg:sm:p-10 ">
   


 
   <div className="w-full lg:max-w-screen-md lg:bg-blue-50/60 lg:border-b lg:border-blue-200  lg:shadow-lg lg:p-6 lg:sm:p-10 ">
     {/* Leave space for your custom header here */}
 
     <div className="mt-0 sm:mt-0">
       <h2 className="text-2xl sm:text-2xl font-semibold text-blue-600 mb-4 border-b border-gray-300 pb-2 flex items-center gap-2 whitespace-nowrap">
         PAN verification
       </h2>
 
       <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-1 pb-2">
         How to Use
       </h2>
 
       {/* Embedded Video */}
       <div className="lg:h-3/4 w-full   aspect-video rounded-xl overflow-hidden mb-8 shadow-sm border">
         <iframe
           className="w-full h-full "
           src="https://www.youtube.com/embed/dQw4w9WgXcQ"
           title="How to Use Video"
           frameBorder="0"
           allowFullScreen
         ></iframe>
       </div>
 
       {/* Input Field + Submit */}
       <form onSubmit={handleSubmit} className="mb-4">
         <div className="flex items-center gap-4">
           <label className="block mb-2 text-md font-medium text-black">
            PAN Number <span className="text-red-500">*</span>
           </label>
           <span className="block text-sm mb-2 font-medium ml-auto text-black">
             Rs. 5/Report
           </span>
         </div>
 
         <div className="flex flex-col items-center w-full">
           <input
             type="text"
             value={PanNumber}
             onChange={(e) => setPanNumber(e.target.value)}
             placeholder="Enter PAN Number"
             className="w-full px-4 py-3 border border-gray-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             required
           />
           <button
             type="submit"
             className="mt-4 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow hover:brightness-110 transition-all"
           >
             Submit
           </button>
         </div>
       </form>
 
       {/* Sample Response Button */}
       <div className="mt-6 text-center">
         <a
           href="/sample-response.pdf"
           target="_blank"
           rel="noopener noreferrer"
           className="inline-block text-blue-600 underline text-sm hover:text-blue-800 transition-colors"
         >
         Click to view Sample PAN verification Report
         </a>
       </div>
 
       {/* Title + Description */}
       <div className="mt-4 border-t pt-4 border-gray-200">
         <h3 className="text-xl font-semibold text-gray-800 mb-2">Description:</h3>
         <p className="text-md text-gray-800 leading-relaxed">
         This service is available for verified dealers in the used car market and is a game-changer for them. It enables instant PAN verification using the PAN number, helping detect identity fraud and verify the authenticity of sellers or buyer in the used car market.
          <br/>
           <strong>Detailed PAN report includes the following details:</strong>
           <ul class="list-disc pl-6">
           <li>PAN No.</li>
           <li>First Name</li>
           <li>Middle Name</li>
           <li>Last Name</li>
           <li>Masked Aadhaar Number</li>
           <li>Date of Birth</li>
           <li>Gender</li>
           <li>Address</li>
         </ul>
         
  




         </p>
 
         <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Why It Matters:</h3>
         <p className="text-md text-gray-800 leading-relaxed">
         This service is available for verified dealers in the used car market and is a game-changer for them. It helps detect identity fraud, ensures accurate seller or buyer verification, and enables more reliable transactions. it ensures the integrity and trustworthiness of the verification process.
         </p>
       </div>
     </div>
   </div>
   <div className="hidden lg:block lg:w-1/3 lg:pl-6">
   <img
     src="/your-image.jpg"  // Replace with your actual image path
     alt="Decorative"
     className="w-full h-full object-cover rounded-r-2xl"
   />
 </div>
 </div>

 </div>
  );
};

export default PanResponse;
