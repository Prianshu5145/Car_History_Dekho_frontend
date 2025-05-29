import { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
 
  Phone,
  RefreshCw,
 
  User,
  
  PlusCircle,
} from "lucide-react";


import { Link } from 'react-router-dom';


import AddWalletPopup from '../components/AddWalletPopup';

import { useWallet } from '../Contexts/WalletContext';





export default function Header({ disableButtons }){
 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
     
       const handleAddBalance = () => {
         setIsPopupOpen(true);   // Open the popup
           // Call any other function you want
       };
       
       const handleClosePopup = () => setIsPopupOpen(false);
       const handleSuccess = (newBalance) => {
         
         
       };
  


  // Load Razorpay script
  useEffect(() => {
   
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // Initial fetch of stats
    

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
    const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { data, loading, fetchWalletBalance } = useWallet();

 
  

  
 
  
     // Optional: close the popup after navigating
  

    return(
      <header className="bg-blue-700  lg:bg-white shadow px-4 py-3 sm:px-6 sm:py-3 border-b border-gray-300">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Welcome Text */}
        <h1 className="text-lg sm:text-xl text-white font-semibold">Welcome to your dashboard!</h1>
    
        {/* Divider for mobile */}
        <div className="block sm:hidden  border-t  border-white" />
    
        {/* Right Section */}
        <div className=" flex justify-between items-center  sm:justify-end sm:gap-6 w-full sm:w-auto">
          
          {/* Wallet Box */}
          <div className="flex flex-col items-center  bg-white border border-white lg:border-blue-500 rounded-xl px-4 py-1 shadow-sm">
            <div className="flex items-center gap-3">
              <button
               onClick={fetchWalletBalance} // Call the context method here
               disabled={disableButtons} // Optional: disable while loading
                className="text-sm text-blue-600 flex items-center  disabled:text-gray-400 disabled:hover:text-gray-400 disabled:cursor-not-allowed gap-1"
              >
                <RefreshCw
                  size={24}
                  className={loading.walletBalance ? "animate-spin" : ""}
                />
              </button>
              <div className="text-xl font-semibold text-gray-900 mb-0">
                {data.walletBalance !== null ? `₹${data.walletBalance}` : "-"}
              </div>
              <button
  onClick={handleAddBalance}
  disabled={disableButtons}
  className="text-green-500 hover:text-green-700 transition-all p-2 rounded-md disabled:text-gray-400 disabled:hover:text-gray-400 disabled:cursor-not-allowed"
>
  <PlusCircle size={26} />
</button>


            </div>
            <AddWalletPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSuccess={handleSuccess}
      />
            <div className="text-xs text-black mt-1">Wallet Balance</div>
          </div>
    
          {/* Right Side Icons: Call + Profile */}
          <div className="flex items-center  gap-4">
            {/* Call Button */}
            <button 
  disabled={disableButtons}
  className="bg-white p-2 rounded-full text-blue-700 lg:border lg: border-blue-700 lg:transition-colors hover:bg-blue-200"
  onClick={() => window.location.href = "tel:+919119913441"} // Replace with your desired phone number
>
  <Phone size={18} />
</button>

    
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                disabled={disableButtons}
                className="bg-white p-2 rounded-full lg:border lg: border-blue-700 lg:transition-colors  hover:bg-gray-300"
              >
                <User size={20} />
              </button>
    
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
               <ul>
  <Link to="/profile">
    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
      Profile
    </li>
  </Link>
  
  <Link to="/support">
    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
      Support
    </li>
  </Link>
  
  <Link to="/logout">
    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
      Logout
    </li>
  </Link>
</ul>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
     
        <div>
      {/* Button to open popup */}
      
      {/* Modal */}
      
    </div>

      
    </header>
    )
};
