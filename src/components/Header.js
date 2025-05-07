import { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
 
  Phone,
  RefreshCw,
 
  User,
  
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';
import { X } from 'lucide-react'; 
import numWords from 'num-words';
  








export default function Header({ disableButtons }){
  const [isOpenbalance, setIsOpenbalance] = useState(false);
  const [amount, setAmount] = useState('');

  const openPopup = () => setIsOpenbalance(true);
  const closePopup = () => {
    setAmount('');
    setIsOpenbalance(false);
  };

const navigate = useNavigate();
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

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
    const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [data, setData] = useState({
    walletBalance: null,
  });

  const [loading, setLoading] = useState({
    walletBalance: false,
  });

 
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

  
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return alert("Enter a valid amount");

    try {
      const { data } = await axios.post('http://localhost:5000/api/payment/create-order', { amount }, { withCredentials: true });

      const options = {
        key: 'rzp_live_bVtFI334cjlPRn', // or use process.env in CRA
        amount: data.order.amount,
        currency: 'INR',
        name: 'Car History Dekho',
        description: 'Wallet Recharge',
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post('http://localhost:5000/api/payment/verify', {
              ...response,
              amount: Number(amount),
            }, { withCredentials: true });

            alert('Payment Successful! New Balance: ₹' + verifyRes.data.newBalance);

            // After payment verification, navigate to the new page (e.g., "Dashboard")
            navigate('/Dashboard');  // Change '/success' to your desired route
          } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: 'Your Name',
          email: 'email@example.com',
        },
        theme: {
          color: '#22c55e',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('Error creating order', err);
      alert('Payment failed');
    }
    finally{
      closePopup();
    }
  };
  
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
                onClick={() => fetchStat("walletBalance")}
                disabled={disableButtons}
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
 onClick={openPopup}
  disabled={disableButtons}
  className="text-green-500 hover:text-green-700 transition-all p-2 rounded-md disabled:text-gray-400 disabled:hover:text-gray-400 disabled:cursor-not-allowed"
>
  <PlusCircle size={26} />
</button>


            </div>
            <div className="text-xs text-black mt-1">Wallet Balance</div>
          </div>
    
          {/* Right Side Icons: Call + Profile */}
          <div className="flex items-center  gap-4">
            {/* Call Button */}
            <button disabled={disableButtons}
            className="bg-white p-2 rounded-full text-blue-700 lg:border lg: border-blue-700 lg:transition-colors hover:bg-blue-200">
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
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                <ul>
  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <Link to="/profile">Profile</Link>
  </li>
 
  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <Link to="/support">Support</Link>
  </li>
  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
    <Link to="/logout">Logout</Link> {/* Add logout functionality if needed */}
  </li>
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
      {isOpenbalance && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white w-[90%] md:w-[75%] max-h-[90vh] overflow-auto rounded-xl shadow-lg p-6 relative">
      {/* Close Icon */}
      <button
        onClick={closePopup}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <X size={24} />
      </button>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center">Add Wallet Balance</h2>

      {/* Form */}
      <form onSubmit={handlePayment} className="space-y-5">
        {/* Currency */}
        <div>
          <label className="block mb-1 font-medium">Select Currency</label>
          <select
            disabled
            className="w-full border px-4 py-2 rounded-lg bg-gray-100 cursor-not-allowed"
          >
            <option>Indian Rupees (INR)</option>
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="block mb-1 font-medium">Enter Credit Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Amount in Words */}
        {amount && (
          <div>
            <label className="block mb-1 font-medium">Credit Amount in Words</label>
            <input
              type="text"
              value={numWords(Number(amount)).replace(/^\w/, c => c.toUpperCase()) + " rupees"}
              readOnly
              className="w-full border px-4 py-2 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Balance
        </button>
      </form>
    </div>
  </div>
)}
    </div>

      
    </header>
    )
}
