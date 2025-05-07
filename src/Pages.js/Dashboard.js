import { useState, useEffect, useRef } from "react";
import axios from "axios";

import {
 
  
  RefreshCw,
  
} from "lucide-react";
import Sidebar from "../components/sidebar";
import MobileMenu from "../components/MobileMenu";
import DashboardGrid from "../components/dashboardbutton";
import Header from "../components/Header";
import { Link } from 'react-router-dom';
export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [data, setData] = useState({
    transactions: null,
    creditsUsed: null,
    creditsAdded: null,
    walletBalance: null,
  });

  const [loading, setLoading] = useState({
    transactions: false,
    creditsUsed: false,
    creditsAdded: false,
    walletBalance: false,
  });

  useEffect(() => {
    fetchWalletBalance();
    fetchTotalTransactions();
    fetchCreditsUsed();
    fetchCreditsAdded();

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchWalletBalance = async () => {
    setLoading(prev => ({ ...prev, walletBalance: true }));
    try {
      const res = await axios.get('http://localhost:5000/api/payment/balance', { withCredentials: true });
      setData(prev => ({ ...prev, walletBalance: res.data.balance }));
    } catch (err) {
      console.error("Wallet balance fetch error:", err);
    } finally {
      setLoading(prev => ({ ...prev, walletBalance: false }));
    }
  };

  const fetchTotalTransactions = async () => {
    setLoading(prev => ({ ...prev, transactions: true }));
    try {
      const res = await axios.get('http://localhost:5000/api/payment/total-transaction', { withCredentials: true });
      console.log('total',res);
      setData(prev => ({ ...prev, transactions: res.data.totalTransactions }));
    } catch (err) {
      console.error("Transactions fetch error:", err);
    } finally {
      setLoading(prev => ({ ...prev, transactions: false }));
    }
  };

  const fetchCreditsUsed = async () => {
    setLoading(prev => ({ ...prev, creditsUsed: true }));
    try {
      const res = await axios.get('http://localhost:5000/api/payment/total-debit', { withCredentials: true });
      setData(prev => ({ ...prev, creditsUsed: res.data.totalCreditUsed }));
    } catch (err) {
      console.error("Credits used fetch error:", err);
    } finally {
      setLoading(prev => ({ ...prev, creditsUsed: false }));
    }
  };

  const fetchCreditsAdded = async () => {
    setLoading(prev => ({ ...prev, creditsAdded: true }));
    try {
      const res = await axios.get('http://localhost:5000/api/payment/total-credit', { withCredentials: true });
      setData(prev => ({ ...prev, creditsAdded: res.data.totalCreditAdded }));
    } catch (err) {
      console.error("Credits added fetch error:", err);
    } finally {
      setLoading(prev => ({ ...prev, creditsAdded: false }));
    }
  };

  const items = [
    { key: "walletBalance", label: "Wallet Balance", color: "blue" },
    { key: "transactions", label: "Total Transactions", color: "blue" },
    { key: "creditsUsed", label: "Total Credits Used", color: "blue" },
    { key: "creditsAdded", label: "Total Credits Added", color: "blue" },
  ];

  return (
    <div className="min-h-screen bg-white lg:pl-[19.2rem]">
      <Sidebar />
      <MobileMenu />
      <Header />

      <main className="p-6">
        <div className="bg-blue-700 text-white p-6 rounded-lg mb-6 flex justify-between items-center shadow">
          <div>
            <h2 className="text-xl font-semibold mb-2">Car Dealer-Focused Products</h2>
            <p className="text-sm mb-4">
            Empowering smart vehicle transactions with our trusted verification suite. Instantly access Odometer & Service History, RC Verification, Challan Status, and Owner Identity Checks — all in one place.
            </p>
            
          </div>
          <div className="w-32 h-32 bg-blue-800 rounded-lg" />
        </div>

        <DashboardGrid />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.key}
              className={`bg-white p-4 rounded-lg shadow border-l-4 border-${item.color}-500`}
            >
              <div className="text-gray-700 mb-2 font-medium">{item.label}</div>
              <div className="text-2xl font-semibold text-gray-900 mb-3">
              {data[item.key] !== null
  ? item.key === "transactions"
    ? data[item.key]
    : `₹${data[item.key]}`
  : "--"}

              </div>
              <button
                onClick={() => {
                  if (item.key === "walletBalance") fetchWalletBalance();
                  else if (item.key === "transactions") fetchTotalTransactions();
                  else if (item.key === "creditsUsed") fetchCreditsUsed();
                  else if (item.key === "creditsAdded") fetchCreditsAdded();
                }}
                className="text-sm text-blue-600 flex items-center gap-1"
              >
                <RefreshCw size={14} className={loading[item.key] ? "animate-spin" : ""} />
                {loading[item.key] ? "Refreshing..." : "Refresh"}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-blue-700 text-white p-6 rounded-lg mt-6 flex justify-between items-center shadow">
          <div>
            <h2 className="text-xl font-semibold mb-2">Verify Before You Buy</h2>
            <p className="text-sm mb-4">
            From RC status to service history and PAN checks — verify everything in one place before sealing the deal.


            </p>
            <Link to="/Dashboard">
  <button className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-100">
    Explore Now
  </button>
</Link>
          </div>
          <div className="w-32 h-32 bg-blue-800 rounded-lg" />
        </div>
      </main>
    </div>
  );
}
