// src/context/WalletContext.js

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

// Inside your component:


const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
 
const location = useLocation();
const navigate = useNavigate();
  const [data, setData] = useState({
    walletBalance: null,
    transactions: null,
    creditsUsed: null,
    creditsAdded: null,
  });

  const [loading, setLoading] = useState({
    walletBalance: false,
    transactions: false,
    creditsUsed: false,
    creditsAdded: false,
  });

  
const fetchWalletBalance = async () => {
  setLoading(prev => ({ ...prev, walletBalance: true }));
  try {
    const res = await axios.get(
      "https://car-history-dekho-backend-production.up.railway.app/api/payment/balance",
      { withCredentials: true }
    );
    setData(prev => ({ ...prev, walletBalance: res.data.balance }));

    // Check current URL path and navigate to /dashboard if on root
    if (location.pathname === "/") {
      navigate("/Dashboard");
    }
  } catch (err) {
    // Optionally handle error here
  } finally {
    setLoading(prev => ({ ...prev, walletBalance: false }));
  }
};


  const fetchTotalTransactions = async () => {
    setLoading(prev => ({ ...prev, transactions: true }));
    try {
      const res = await axios.get("https://car-history-dekho-backend-production.up.railway.app/api/payment/total-transaction", { withCredentials: true });
      setData(prev => ({ ...prev, transactions: res.data.totalTransactions }));
    } catch (err) {
      navigate('/login');
    } finally {
      setLoading(prev => ({ ...prev, transactions: false }));
    }
  };

  const fetchCreditsUsed = async () => {
    setLoading(prev => ({ ...prev, creditsUsed: true }));
    try {
      const res = await axios.get("https://car-history-dekho-backend-production.up.railway.app/api/payment/total-debit", { withCredentials: true });
      setData(prev => ({ ...prev, creditsUsed: res.data.totalCreditUsed }));
    } catch (err) { 
    } finally {
      setLoading(prev => ({ ...prev, creditsUsed: false }));
    }
  };

  const fetchCreditsAdded = async () => {
    setLoading(prev => ({ ...prev, creditsAdded: true }));
    try {
      const res = await axios.get("https://car-history-dekho-backend-production.up.railway.app/api/payment/total-credit", { withCredentials: true });
      setData(prev => ({ ...prev, creditsAdded: res.data.totalCreditAdded }));
    } catch (err) {
     
    } finally {
      setLoading(prev => ({ ...prev, creditsAdded: false }));
    }
  };

  const refreshAll = () => {
    fetchWalletBalance();
    // fetchTotalTransactions();
    // fetchCreditsUsed();
    // fetchCreditsAdded();
  };

  useEffect(() => {
    refreshAll(); // or call only fetchWalletBalance() initially if that's all you want
  }, []);

  return (
    <WalletContext.Provider
      value={{
        data,
        loading,
       
        fetchWalletBalance,
        fetchTotalTransactions,
        fetchCreditsUsed,
        fetchCreditsAdded,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
