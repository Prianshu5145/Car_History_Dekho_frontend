import { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
 
  Phone,
  RefreshCw,
 
  User,
  
  PlusCircle,
} from "lucide-react";

import { Link } from 'react-router-dom';


  








export default function Header(){
    const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [data, setData] = useState({
    walletBalance: null,
  });

  const [loading, setLoading] = useState({
    walletBalance: false,
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    // Initial fetch of stats
    ["walletBalance"].forEach((key) => {
      fetchStat(key);
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchStat = async (key) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      const response = await axios.get('http://localhost:5000/api/payment/balance', {
        withCredentials: true, // This will include credentials like cookies in the request
      });
     
      const value = response.data.balance;
      setData((prev) => ({ ...prev, [key]: value }));
    }catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const items = [
    { key: "walletBalance", label: "Wallet Balance", color: "blue" },
  ];

    return(
      <header className="bg-blue-700 lg:bg-white shadow px-4 py-3 sm:px-6 sm:py-3 border-b border-white">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Welcome Text */}
        <h1 className="text-lg sm:text-xl text-white font-semibold">Welcome to your dashboard!</h1>
    
        {/* Divider for mobile */}
        <div className="block sm:hidden  border-t  border-white" />
    
        {/* Right Section */}
        <div className=" flex justify-between items-center  sm:justify-end sm:gap-6 w-full sm:w-auto">
          
          {/* Wallet Box */}
          <div className="flex flex-col items-center bg-white border border-white rounded-xl px-4 py-1 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchStat("walletBalance")}
                className="text-sm text-blue-600 flex items-center gap-1"
              >
                <RefreshCw
                  size={14}
                  className={loading.walletBalance ? "animate-spin" : ""}
                />
              </button>
              <div className="text-xl font-semibold text-gray-900 mb-0">
                {data.walletBalance !== null ? `₹${data.walletBalance}` : "-"}
              </div>
              <Link to="/Payment-Page" className="text-green-500 hover:text-green-700 transition-all">
        <PlusCircle size={20} />
      </Link>
            </div>
            <div className="text-xs text-black mt-1">Wallet Balance</div>
          </div>
    
          {/* Right Side Icons: Call + Profile */}
          <div className="flex items-center gap-4">
            {/* Call Button */}
            <button className="bg-white p-2 rounded-full text-blue-700 hover:bg-blue-200">
              <Phone size={18} />
            </button>
    
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-white p-2 rounded-full  hover:bg-gray-300"
              >
                <User size={20} />
              </button>
    
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Support</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
    )
}
