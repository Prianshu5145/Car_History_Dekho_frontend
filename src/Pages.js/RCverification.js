import React, { useState,useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import MobileMenu from "../components/MobileMenu";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const RCResponse = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
 
  
  const generateServicePDF = (data) => {
    const result = data.data.result;
  
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [210, 340], // Custom tall size
    });
  
    doc.setFontSize(24);
    doc.text(`Vehicle RC Verification Report - ${result.rc_number}`, 14, 15);
  
    doc.setFontSize(13);
    autoTable(doc, {
      startY: 25,
      head: [[{ content: 'Vehicle Details', colSpan: 2, styles: { halign: 'left' } }]],
      body: [
        ['Registration Number :', result.rc_number || '-'],
        ['Owner Name :', result.owner_name || '-'],
        ['Father\'s Name :', result.father_name || '-'],
        ['Registration Date :', result.registration_date || '-'],
        ['Chassis Number :', result.vehicle_chasi_number || '-'],
        ['Engine Number :', result.vehicle_engine_number || '-'],
        ['Vehicle Category :', result.vehicle_category || '-'],
        ['Maker Description :', result.maker_description || '-'],
        ['Variant :', result.maker_model || '-'],
        ['Body Type :', result.body_type || '-'],
        ['Fuel Type :', result.fuel_type || '-'],
        ['Color :', result.color || '-'],
        ['Is Financed :', result.financed === "true" ? 'YES' : (result.financed === "false" ? 'NO' : result.financed)],
        ['Financier :', result.financer || '-'],
        ['Insurance Company :', result.insurance_company || '-'],
        ['Insurance Policy Number :', result.insurance_policy_number || '-'],
        ['Insurance Valid Upto :', result.insurance_upto || '-'],
        ['Ownership Count :', result.owner_number || '-'],
        ['NOC Details :', result.noc_details === 'NA' ? 'Not Issued' : (result.noc_details === '' ? '-' : result.noc_details)],

        ['Blacklist Status :', result.blacklist_status === 'NA' ? 'No' : result.blacklist_status],
        ['Blacklist Details :', result.blacklistDetails === 'NA' ? '-' : result.blacklistDetails],
        ['Manufacturing Date :', result.manufacturing_date || '-'],
        ['Is Commercial :', result.isCommercial === '' ?  'NO' : result.isCommercial ],
        ['Registered RTO :', result.registered_at || '-'],
        ['Registration Authority :', result.regAuthority || '-'],
        ['Present Address :', result.present_address || '-'],
        ['Permanent Address :', result.permanent_address || '-'],
        
        
       
        ['Norms Type :', result.norms_type || 'N/A'],
        ['Cubic Capacity (cc) :', result.cubic_capacity || '-'],
        ['Gross Vehicle Weight (kg) :', result.vehicle_gross_weight || '-'],
        ['Number of Cylinders :', result.no_cylinders || '-'],
        ['Seat Capacity :', result.seat_capacity || '-'],
        ['Sleeper Capacity :', result.sleeper_capacity || '-'],
        ['Standing Capacity :', result.standing_capacity || '-'],
        ['Wheelbase (mm)', result.wheelbase || '-'],
        ['Unladen Weight (kg) :', result.unladen_weight || '-'],
        ['RC Status :', result.rc_status === 'Y' ? 'Active' : (result.rc_status === 'N' ? 'Inactive' : (result.rc_status || '-'))],


        ['Fitness Up To :', result.fit_up_to || '-'],
        ['Tax Paid Up To :', result.tax_paid_upto || '-'],
        ['Tax Valid Upto :', result.tax_upto || '-'],
        ['PUCC Number :', result.pucc_number || '-'],
        ['PUCC Valid Upto :', result.pucc_upto || '-'],
        ['Permit Number :', result.permit_number || '-'],
        ['Pemit Valid Upto :', result.permit_valid_upto || '-'],
        ['Permit Type :', result.permit_type || '-'],
        ['National Permit Number :', result.national_permit_number || '-'],
        ['National Permit Valid Upto :', result.national_permit_upto || '-'],
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
    
    if (data.row.index === 3) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
    if (data.row.index === 4) {
      data.cell.styles.fontStyle = 'bold'; 
      data.cell.styles.fontSize = 11;// Bold header
    }
    if (data.row.index === 5) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
    if (data.row.index === 8) {
      data.cell.styles.fontStyle = 'bold'; 
      data.cell.styles.fontSize = 11;// Bold header
    }
    if (data.row.index === 12) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
    if (data.row.index === 13) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
    if (data.row.index === 16) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
    if (data.row.index === 18) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
    if (data.row.index === 19) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
    if (data.row.index === 22) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
    if (data.row.index === 23) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
    if (data.row.index === 26) {
      data.cell.styles.fontStyle = 'bold';
      data.cell.styles.fontSize = 11; // Bold header
    }
  },
    });
  
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };
  
  
  

  
  

// Format Service Type: if PS, it will show as "Periodic Service"



  
  


  

const [loading, setLoading] = useState(false);

const [submissionSuccess, setSubmissionSuccess] = useState(false);
const [errorInfo, setErrorInfo] = useState(null);
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("http://localhost:5000/api/service/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        serviceName: "RC Verification" ,
        payload: {
  vehicleNumber: vehicleNumber.toUpperCase(),
}

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
     // Log the entire response to see the structure

    // Access the result data from the nested structure
    

    
      generateServicePDF(data);
      setSubmissionSuccess(true);
 // Pass the correct data to the PDF generation function
    } 
    catch (error) {
      setErrorInfo({
        type: 'generic',
        message: 'Network or server error. Please try again.',
      });
    }
    finally {
      setLoading(false);
      }
   
   
};


  
  const navigate = useNavigate();
  useEffect(() => {
    const handlePopState = (event) => {
      // When user presses browser back, redirect to /dashboard
      event.preventDefault();
      navigate("/dashboard", { replace: true }); // Replace current entry
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

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
         RC verification
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
             Vehicle Number <span className="text-red-500">*</span>
           </label>
           <span className="block text-sm mb-2 font-medium ml-auto text-black">
             Rs. 6/Report
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
            src="https://res.cloudinary.com/dztz5ltuq/image/upload/v1731448689/apple-touch-icon_jrhfll.png"
            alt="Car Logo"
            className="w-12 h-12 md:w-16 md:h-16 animate-rotateY"
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
        window.open("/sample-response.pdf", "_blank", "noopener,noreferrer");
      }
    }}
    disabled={loading}
    className={`text-blue-600 underline text-sm transition-colors bg-white  lg:bg-blue-50/60 border-none ${
      loading
        ? "opacity-50 cursor-not-allowed pointer-events-none"
        : "hover:text-blue-800"
    }`}
  >
    Click to view Sample Check Report
  </button>
</div>

 
       {/* Title + Description */}
       <div className="mt-4 border-t pt-4 border-gray-200">
         <h3 className="text-xl font-semibold text-gray-800 mb-2">Description:</h3>
         <p className="text-md text-gray-800 leading-relaxed">
         This service is available for verified dealers in the used car market and is a game-changer for them. It provides detailed RC details including ownership, registration info, vehicle specs, finance, and insurance — helping detect fraud and verify vehicles details in used car market.
          <br/>
           <strong>Detailed RC report includes the following details:</strong>
           <ul className="list-disc pl-5 grid grid-cols-2 gap-4 mt-2">
  <li>Registration Number</li>
  <li>Registration Date</li>
  <li><strong>Owner Name</strong></li>
  <li>Father Name</li>
  <li>Present Address</li>
  <li>Permanent Address</li>
  <li>Vehicle Category</li>
  <li>Chassis Number</li>
  <li>Engine Number</li>
  <li>Manufacturer</li>
  <li><strong>Model</strong></li>
  <li>Body Type</li>
  <li>Fuel Type</li>
  <li>Color</li>
  <li>Norms Type</li>
  <li>Fit Up To</li>
  <li>Financer</li>
  <li><strong>Finance details</strong></li>
  <li>Insurance Company</li>
  <li>Insurance Policy No.</li>
  <li><strong>Insurance Upto</strong></li>
  <li><strong>Manufacturing Date</strong></li>
  <li><strong>Registered At</strong></li>
  <li>Latest By</li>
  <li>Tax Upto</li>
  <li>Tax Paid Upto</li>
  <li>Cubic Capacity</li>
  <li>Gross Vehicle Weight</li>
  <li>No of Cylinders</li>
  <li>Seat Capacity</li>
  <li>Sleeper Capacity</li>
  <li>Standing Capacity</li>
  <li>Wheelbase</li>
  <li>Unladen Weight</li>
  <li>Vehicle Category Description</li>
  <li>PUCC Number</li>
  <li>PUCC Upto</li>
  <li>Permit Number</li>
  <li>Permit Issue Date</li>
  <li>Permit Valid From</li>
  <li>Permit Valid Upto</li>
  <li>Permit Type</li>
  <li>National Permit Number</li>
  <li>National Permit Upto</li>
  <li>National Permit Issued By</li>
  <li>Non-Use Status</li>
  <li>Non-Use From</li>
  <li>Non-Use To</li>
  <li><strong>Blacklist Status</strong></li>
  <li><strong>NOC Details</strong></li>
  <li><strong>Owner Number</strong></li>
  <li>RC Status</li>
  <li>Permanent Pincode</li>
  <li>Is Luxury Mover</li>
  <li>Make Name</li>
  <li><strong>Variant Name</strong></li>
  <li>Status As On</li>
  <li><strong>Is Commercial</strong></li>
  <li>Manufacture Year</li>
  <li>Purchase Date</li>
  <li>RTO Code</li>
  <li>RTO Name</li>
  <li>Registration Authority</li>
  <li>RC Standard Cap</li>
  <li><strong>Blacklist Details</strong></li>
  <li>City of Registration</li>
  <li>City of Registration ID</li>
  <li>Expiry Duration</li>
  <li>City</li>
  <li>Year</li>
</ul>




         </p>
 
         <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">Why It Matters:</h3>
         <p className="text-md text-gray-800 leading-relaxed">
         This service is available for verified dealers in the used car market and is a game-changer for them. It helps detect fraud, ensures accurate vehicle ownership details, and enables better analysis of a vehicle's registration history. it ensures the integrity and trustworthiness of the information.
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

export default RCResponse;
