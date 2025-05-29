import { useState, useEffect, useRef } from "react";
import { useWallet } from "../Contexts/WalletContext";  // Use WalletContext
import { RefreshCw } from "lucide-react";
import Sidebar from "../components/sidebar";
import MobileMenu from "../components/MobileMenu";
import DashboardGrid from "../components/dashboardbutton";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Dashboard() {
  const dropdownRef = useRef(null);

  // Use Wallet Context
  const { data, loading, fetchWalletBalance, fetchTotalTransactions, fetchCreditsUsed, fetchCreditsAdded } = useWallet();

  const items = [
    { key: "walletBalance", label: "Wallet Balance", color: "blue" },
    { key: "transactions", label: "Total Transactions", color: "blue" },
    { key: "creditsUsed", label: "Total Credits Used", color: "blue" },
    { key: "creditsAdded", label: "Total Credits Added", color: "blue" },
  ];
 useEffect(() => {
   fetchWalletBalance();
    fetchTotalTransactions();
    fetchCreditsUsed();
    fetchCreditsAdded(); // or call only fetchWalletBalance() initially if that's all you want
  }, []);



  return (
    <div className="min-h-screen bg-white lg:pl-[19.2rem]">
    <Helmet>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>
      <Sidebar />
      <MobileMenu />
      <Header />

      <main className="p-6">
        {/* <div className="bg-blue-700 text-white p-6 rounded-lg mb-6 flex justify-between items-center shadow">
          <div>
            <h2 className="text-xl font-semibold mb-2">Car Dealer-Focused Products</h2>
            <p className="text-sm mb-4">
              Empowering smart vehicle transactions with our trusted verification suite.
            </p>
          </div>
          <div className="w-32 h-32 bg-blue-800 rounded-lg" />
        </div> */}

        <DashboardGrid />

        {/* Data Display Grid */}
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

              {/* Refresh Button */}
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
