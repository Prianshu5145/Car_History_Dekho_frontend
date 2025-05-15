import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import MobileMenu from "../components/MobileMenu";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import axios from 'axios';
import AddWalletPopup from '../components/AddWalletPopup';
const ChallanResponse = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const handleAddBalance = () => {
      setIsPopupOpen(true);   // Open the popup
      setErrorInfo(null)     // Call any other function you want
    };
    
    const handleClosePopup = () => setIsPopupOpen(false);
    const handleSuccess = (newBalance) => {
     
      
    };

  
  
  

  
 

 
  
  const generateChallanPDF = (challanData) => {
    const { Pending_data = [], Disposed_data = [] } = challanData.data?.result || {};

    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: [210, 380],
    });
    let count1=0;
    let count2 = false;
    doc.setFontSize(24);
    doc.setTextColor(33, 37, 41);
    doc.text("All-in-One Challan Report", 13, 12);

    const drawMainSectionTitle = (title, count, startY) => {
      
        const fullTitle = `${title} (${count > 1 ? 'Total Challans' : 'Total Challan'} - ${count})`;

        doc.setFontSize(16);
        doc.setTextColor(200, 0, 0); // Red
        const textWidth = doc.getTextWidth(fullTitle);
        const centerX = (210 - textWidth) / 2;
        doc.text(fullTitle, centerX, startY);
        doc.setDrawColor(200, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(13, startY + 2, 196, startY + 2);
        return startY + 8;
    };

    const drawSection = (title, data, startY, drawLine = false, tableCountRef,count1,count2) => {
      if (title && tableCountRef.count % 3 === 0 && tableCountRef.count !== 0 && count1<=0) {
        doc.addPage();
        startY = 20;
        count2 = true;
    }

        if (title) {
            doc.setFontSize(14);
            doc.setTextColor(0, 112, 192);
            doc.text(title, 14, startY);

            if (drawLine) {
                doc.setDrawColor(0, 112, 192);
                doc.setLineWidth(0.5);
                doc.line(14, startY + 2, 195, startY + 2);
            }

            startY += 6;
        }

        if (!data.length) {
            autoTable(doc, {
                startY,
                head: [['Note']],
                body: [['No challans available']],
                theme: 'grid',
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
                margin: { left: 14, right: 14 },
            });
            tableCountRef.count++;
            return doc.lastAutoTable.finalY + 15;
        }

        let currentY = startY;
        let serialNumber = 1;

        data.forEach((challan) => {
            if (tableCountRef.count > 0 && tableCountRef.count % 3 === 0 && count1<=0 && count2===false) {
                doc.addPage();
                currentY = 20;
            }

            const body = [
                ['Challan No :', challan.challan_no || '-'],
                ['Date & Time :', challan.challan_date_time || '-'],
                ['Place :', challan.challan_place || '-'],
                ['Status :', challan.challan_status || '-'],
                ['Owner Name :', challan.owner_name || '-'],
                
                ['challan Amount :', challan.fine_imposed || '-']
               
                
            ];

            if (challan.amount_of_fine_imposed != null && challan.amount_of_fine_imposed !== '') {
                const formattedAmount = parseFloat(challan.amount_of_fine_imposed).toFixed(2).replace(/\.00$/, '');
                body.push(['Fine Imposed :', formattedAmount]);
            }
            body.push(['Offence :', challan.offence_details?.[0]?.name || '-']);
            body.push(['Court Name', challan.court_name || '-']);
            body.push(['Court Address', challan.court_address || '-']);

            autoTable(doc, {
                startY: currentY,
                head: [[`S.No. ${serialNumber++}`, 'Field']],
                body,
                theme: 'grid',
                headStyles: {
                    fillColor: [0, 112, 192],
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                    fontSize: 12,
                    halign: 'left',
                    lineColor: [0, 0, 0],
                    lineWidth: 0.2
                },
                columnStyles: {
                    0: { cellWidth: 35 },
                },
                bodyStyles: { textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.1 },
                margin: { left: 14, right: 14 },
            });

            currentY = doc.lastAutoTable.finalY + 10;
            tableCountRef.count++;
            count2=false;
        });

        return currentY;
    };

    const filterChallans = (data, virtual, regular) => {
        return data.filter((item) => {
            const virtualFlag = item.sent_to_virtual_court === 'Yes';
            const regularFlag = item.sent_to_reg_court === 'Yes';

            if (virtual) return virtualFlag;
            if (regular) return !virtualFlag && regularFlag;
            return !virtualFlag && !regularFlag;
        });
    };

    const tableCountRef = { count: 0 };
    let y = 30;

    const virtualPending = filterChallans(Pending_data, true, false);
    const regularPending = filterChallans(Pending_data, false, true);
    const ePending = filterChallans(Pending_data, false, false);
    const totalPending = virtualPending.length + regularPending.length + ePending.length;
    
    y = drawMainSectionTitle("Pending Challans", totalPending, y+3,count1);
    y = drawSection(`1. Pending Virtual Court Challans (${virtualPending.length} Challan)`, virtualPending, y+3, false, tableCountRef,count1,count2);
    y = drawSection(`2. Pending Regular Court Challans (${regularPending.length} Challan)`, regularPending, y+3, false, tableCountRef,count1,count2);
    y = drawSection(`3. Pending E-Challans (${ePending.length} Challan)`, ePending, y+3, false, tableCountRef,count1,count2);

  //  // Insert a page before the heading, if needed
   
    if (tableCountRef.count % 3 === 0 && tableCountRef.count !== 0) {
        doc.addPage({
          orientation: 'portrait',
          unit: 'mm',
          format: [210, 380]});
        y = 20;
        count1++;
    }


    y = drawMainSectionTitle("Disposed(Paid) Challans", Disposed_data.length, y+3);
   
    y = drawSection(``, Disposed_data, y+3, false, tableCountRef,count1);
   
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
    doc.save(`Challan-${vehicleNumber}.pdf`); 
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
        serviceName: "Challan Check",
        payload: {
          vehicleNumber: vehicleNumber.toUpperCase(),
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // No need to call response.json() with axios
    const data = response.data;
    
    generateChallanPDF(data);
    setSubmissionSuccess(true);

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorData = error.response?.data;

      if (status === 402) {
        setErrorInfo({
          type: 'payment',
          message: (
            <p className="text-lg text-gray-800">
              Insufficient balance. <br /> Rs.4 Required for this Service
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
              Server Error
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
       <h2 className="text-2xl sm:text-2xl font-semibold text-blue-600 mb-4 border-b border-gray-300 pb-2 flex items-center gap-2 whitespace-nowrap">
       All-in-One Challan Check
       </h2>
 
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-1 pb-2">
         How to Use
       </h2>
  
       {/* Embedded Video */}
        <div className="lg:h-3/4 w-full   aspect-video rounded-xl overflow-hidden mb-8 shadow-sm border">
         <iframe
           className="w-full h-full "
           src="https://res.cloudinary.com/dunsl7vvf/video/upload/v1747347809/final_challan_video___Made_with_Clipchamp_clean_ovjeou.mp4"
           title="How to Use Video"
           frameBorder="0"
           allowFullScreen
         ></iframe>
       </div> 
 
       {/* Input Field + Submit */}
       <form onSubmit={handleSubmit} className="mb-4">
         <div className="flex items-center gap-4">
           <label className="block mb-2 text-md font-medium text-black">
            Vehicle Number <span className="text-red-500">*</span>
           </label>
           <span className="block text-sm mb-2 font-medium ml-auto text-black">
             Rs. 4/Report
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
             disabled={loading} 
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
       </form>
 
       {/* Sample Response Button */}
       <div className="mt-6 text-center">
  <button
    onClick={() => {
      if (!loading) {
        window.open("https://ucarecdn.com/6713dd18-7234-468a-bd20-96fcc539cea9/Challan_sample.pdf", "_blank", "noopener,noreferrer");
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
         This service is available for verified dealers in the used car market and is a game-changer for them. It enables instant challan verification using the vehicle registration number, retrieving a consolidated report of all paid or unpaid challans, including those sent to virtual or regular court. Dealers receive a single PDF report containing all challan details, ensuring transparent and informed decision-making.
          
         </p>
          <br/>
           <strong>Detailed Challan report includes the following details:</strong>
           <ul class="list-disc pl-6">
           <li>All Paid challans</li>
           <li>All Unpaid challans</li>
           <li>All Regular court challans</li>
           <li>All virtual court challans</li>
           <li>All e-challans</li>
           
         </ul>
         
  




         
 
         <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Why It Matters:</h3>
         <p className="text-md text-gray-800 leading-relaxed">
         This service is available for verified dealers in the used car market and is a game-changer for them. It helps identify any outstanding traffic violations, provides clarity on the legal status of a vehicle, and enables more reliable transactions. It ensures the integrity and trustworthiness of the challan verification process.


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

export default ChallanResponse;
