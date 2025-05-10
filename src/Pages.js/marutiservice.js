import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import MobileMenu from "../components/MobileMenu";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import AddWalletPopup from '../components/AddWalletPopup';
const MarutiResponse = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
 const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddBalance = () => {
    setIsPopupOpen(true);   // Open the popup
    setErrorInfo(null)     // Call any other function you want
  };
  
  const handleClosePopup = () => setIsPopupOpen(false);
  const handleSuccess = (newBalance) => {
   
    
  };
  const generateServicePDF = (data) => {
      const { vehicleNumber, serviceHistoryDetails } = data.data.result;
    
      if (!vehicleNumber || !serviceHistoryDetails) {
        console.error("Missing vehicle number or service history details.");
        return;
      }
    
      // Create a taller-than-A4 page: width 210mm, height 400mm
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [210, 420], // Custom size: taller than A4
      });
    
      doc.setFontSize(24);
      doc.text(`Service History Report - ${vehicleNumber}`, 14, 15);
    
      const totalRecords = serviceHistoryDetails.length;
    
      serviceHistoryDetails.forEach((record, index) => {
        const recordNumber = totalRecords - index;
        const tableIndexOnPage = index % 3; // 0, 1, 2
        const pageNumber = Math.floor(index / 3);
    
        if (index > 0 && tableIndexOnPage === 0) {
          doc.addPage([210, 405]); // Add another tall page
        }
    
        const baseY = pageNumber === 0 ? 35 : 20; // Top margin per page
        const tableSpacing = 130; // Adjust if content overflows
        const startY = baseY + tableIndexOnPage * tableSpacing;
    
        if(recordNumber!==totalRecords){
        doc.setFontSize(17);
        doc.text(`Service Record No. ${recordNumber}`, 14, startY);}
        else{
        doc.setFontSize(17);
        doc.text(`Service Record No. ${recordNumber} (Latest Service)`, 14, startY);
        }
        doc.setFontSize(14);
        autoTable(doc, {
          startY: startY + 6,
          head: [[{ content: 'Vehicle Service  Details', colSpan: 2, styles: { halign: 'left' } }]],
          body: [
            ['Date of Service :', record.dateOfSVC],
            ['Recorded ODOMETER Reading :', `${record.mileage}  KM`],
           
            ['Service type :', `${record.serviceType}`],
            ['Date of Repair Order :', record.dateOfRO],
            
            ['Service Center Name :',record.dealerName],
            ['Service Center Address :',record.dealerAddress],
           
            ['Total Amount (INR) :', record.totalAmmount],
            ['Amount for Parts (INR) :', record.partAmmount],
            ['Amount for Labour (INR) :', record.labourAmmount],
           
          ],
          theme: 'grid',
          styles: { cellPadding: 3, fontSize: 10, halign: 'left' },
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
       
        columnStyles: {
    0: { cellWidth: 70 }, // Adjust width of first column as needed
  },
         
          tableWidth: 'auto',
          didParseCell: function (data) {
            if (data.section === 'body' && data.row.index === 1) {
              data.cell.styles.fontStyle = 'bold';
              data.cell.styles.fontSize = 11; // Adjust size as needed
            }
          },
          margin: {
            top: 0,
            bottom: 2,
          },
          
        });
      });
    
      const pdfBlob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
      doc.save(`Service-${vehicleNumber}.pdf`); 
    };
    
    
    const [loading, setLoading] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
const [errorInfo, setErrorInfo] = useState(null);
    const handleSubmit = async (e) => {
      e.preventDefault();
     
      setLoading(true);
      try {
        const response = await axios.post(
          "https://car-history-dekho-backend-production.up.railway.app/api/service/call",
          {
            serviceName: "Maruti Service",
            payload: {
              vehicleNumber: vehicleNumber.toUpperCase(),
            }
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // ✅ Correct key for sending cookies
          }
        );
      
        const data = response.data;
      
        generateServicePDF(data); 
        setSubmissionSuccess(true);
      
      }
      
        catch (error) {
          if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const errorData = error.response?.data;
      
            if (status === 402) {
              setErrorInfo({
                type: 'payment',
                message: (
                  <p className="text-lg text-gray-800">
                    Insufficient balance. <br/> Rs.25 Required for this Service
                    <br />
                    <strong>Please recharge your wallet.</strong>
                  </p>
                ),
              });
            } else if (status === 401) {
              setErrorInfo({
                type: 'auth',
                message: (
                  <p className="text-lg text-gray-800">
                    Session expired or Unauthenticated
                    <br />
                    <strong>Please login again.</strong>
                  </p>
                ),
              });
            } else {
              setErrorInfo({
                type: 'generic',
                message: (
                  <p className="text-lg text-gray-800">
                    {'Server Error'}
                    <br />
                    <strong>{errorData?.message || error.message}</strong>
                  </p>
                ),
              });
            }
          } else {
            setErrorInfo({
              type: 'generic',
              message: 'Unknown error occurred.',
            });
          }
        } finally {
          setLoading(false);
        }
      };
  return (
    
   <div className="min-h-screen bg-white lg:pl-[19.2rem]"> <Sidebar/>
   <MobileMenu/>
   <Header  disableButtons={loading} />

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
          onClick={handleAddBalance}
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
<AddWalletPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSuccess={handleSuccess}
      />
<div className="px-4 sm:px-8 py-6 flex  lg:max-w-screen lg:bg-white   lg:p-0 lg:sm:p-10 ">
   
 
   <div className="w-full lg:max-w-screen-md lg:bg-blue-50/60 lg:border-b lg:border-blue-200  lg:shadow-lg lg:p-6 lg:sm:p-10 ">
     {/* Leave space for your custom header here */}
 
     <div className="mt-0 sm:mt-0">
       <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4 border-b border-gray-300 pb-2 flex items-center gap-2 whitespace-nowrap">
         MARUTI SUZUKI Service History Check
       </h2>
 
       {/* <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-1 pb-2">
         How to Use
       </h2> */}
 
       {/* Embedded Video */}
       {/* <div className="lg:h-3/4 w-full   aspect-video rounded-xl overflow-hidden mb-8 shadow-sm border">
         <iframe
           className="w-full h-full "
           src="https://www.youtube.com/embed/dQw4w9WgXcQ"
           title="How to Use Video"
           frameBorder="0"
           allowFullScreen
         ></iframe>
       </div> */}
 
       {/* Input Field + Submit */}
       <form onSubmit={handleSubmit} className="mb-4">
         <div className="flex items-center gap-4">
           <label className="block mb-2 text-md font-medium text-black">
             Vehicle Number <span className="text-red-500">*</span>
           </label>
           <span className="block text-sm mb-2 font-medium ml-auto text-black">
             Rs. 25/Report
           </span>
         </div>
 
         <div className="flex flex-col items-center w-full">
           <input
             type="text"
             value={vehicleNumber}
             onChange={(e) => setVehicleNumber(e.target.value)}
             placeholder="Enter vehicle number"
             className="w-full px-4 py-3 border border-gray-700 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
             required
           />
           <button
             type="submit"
             className="mt-4 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow hover:brightness-110 transition-all"
           >
             {loading ? (
  <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center pointer-events-none">
    <div className="flex flex-col items-center justify-center space-y-8 p-4 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md pointer-events-none w-full max-w-sm md:max-w-md lg:max-w-lg mt-[-200px] lg:mt-[-40px]">
      
      {/* Spinner Container */}
      <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
        {/* Outer Spinner Circle */}
        <div className="absolute inset-0 border-[6px] md:border-[6px] border-t-transparent border-l-blue-500 border-r-blue-300 border-b-transparent rounded-full animate-spin"></div>

        {/* Inner Circle */}
        <div className="absolute inset-4 bg-white rounded-full shadow-inner flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746877150/favicon-96x96_q4luce-removebg-preview_rdzu80.png"
            alt="Car Logo"
            className="w-16 h-16 md:w-16 md:h-16 animate-rotateY"
          />
        </div>
      </div>

      {/* Loading Text */}
      <p className="w-full text-lg md:text-xl font-semibold text-gray-800 text-center">
        <strong>Generating Report... Please wait.</strong>
      </p>

      {/* Brand Name */}
      <span className="text-blue-500 text-base font-medium">Car History Dekho</span>
    </div>
  </div>
) : (
  'Submit'
)}

           </button>
         </div>
       </form>
 
       {/* Sample Response Button */}
       <div className="mt-6 text-center">
  <button
    onClick={() => {
      if (!loading) {
        window.open("https://ucarecdn.com/0bd5d266-c807-443b-a8de-6744e99e8199/MSERVICESAMPLES.pdf", "_blank", "noopener,noreferrer");
      }
    }}
    disabled={loading}
    className={`text-blue-600 underline text-md transition-colors bg-white  lg:bg-blue-50/60 border-none ${
      loading
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "hover:text-blue-800"
    }`}
  >
    Click to view Sample Report
  </button>
</div>
 
       {/* Title + Description */}
       <div className="mt-4 border-t pt-4 border-gray-200">
         <h3 className="text-xl font-semibold text-gray-800 mb-2">Description:</h3>
         <p className="text-md text-gray-800 leading-relaxed">
           This feature enables the retrieval of Maruti Suzuki vehicle service history records using the vehicle registration number (e.g., UP8CAXXXX). It helps verify the vehicle’s maintenance history and brings greater transparency and trust to used car transactions.
          
           </p>
          <br/>
           <strong>Service record Report includes the following details:</strong>
           <ul className="list-disc pl-5 space-y-1 mt-2">
  <li><strong>Odometer</strong> – Recorded odometer reading at the time of service (e.g., 70456 KM).</li>
  <li><strong>Service Type</strong> – Type of service performed (e.g., SERVICE CAMP, PS – Periodic Service, FS – Free Service, RR – Running Repair, AR – Accidental Repair).</li>
  <li><strong>Service Center Name</strong> – Name of the service dealership.</li>
  <li><strong>Service Center Address</strong> – Address of center were service was performed.</li>
  <li><strong>Date of Service</strong> – Date when the service was performed.</li>
  
  
             
  <li><strong>Total Amount</strong> – Total amount charged for the service.</li>
  <li><strong>Labour Amount</strong> – Amount charged for labor during service.</li>
  <li><strong>Part Amount</strong> – Amount charged for parts replaced or serviced.</li>
  
  <li><strong>Repair Order Date</strong> – Date when the repair order was created.</li>
  
</ul>

        
 
         <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Why It Matters:</h3>
         <p className="text-md text-gray-800 leading-relaxed">
           This service is available for verified dealers in the used car market and is a game-changer for them. It helps detect fraud, prevents odometer tampering, and enables better analysis of the vehicle's condition. By providing clear, transparent maintenance history without storing or sharing any personal data, it ensures the integrity and trustworthiness of the information.
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

 {submissionSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-semibold text-green-600">Report generated successfully.</h2>
            <p className="mt-2 text-gray-700">THANK YOU.</p>
            <button
              onClick={() => setSubmissionSuccess(false)}
              className="mt-4 px-6 py-2 bg-blue-500 text
              white rounded-lg hover:bg-blue-600 transition"
            >
            Close
            </button>
          </div>
        </div>
      )}

 </div>
  );
};

export default MarutiResponse;
