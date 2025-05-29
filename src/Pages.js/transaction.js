import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import MobileMenu from "../components/MobileMenu";
import { Helmet } from "react-helmet-async";
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
  const response=  axios.get('https://car-history-dekho-backend-production.up.railway.app/api/user/transactions', {
      withCredentials: true,
    })
   
      .then(res => setTransactions(res.data.transactions))
      .catch(err => console.error(err));
      console.log(response);
  }, []);

  const reversedTransactions = [...transactions].reverse();
 
  return (
    <div> 
    <Helmet>
  <meta name="robots" content="noindex, nofollow" />
</Helmet>
      <Sidebar />
      <MobileMenu />
      <Header />
      <div className="p-2 mt-2 lg:mt-0 min-h-screen bg-white lg:pl-[19.2rem]">
        
        {/* Mobile View: Cards */}
        <div className="block md:hidden space-y-4">
          {reversedTransactions.length === 0 ? (
            <p className="text-center text-gray-600 mt-8">No transactions found.</p>
          ) : (
            reversedTransactions.map((tx, i) => (
              <div key={i} className="bg-white p-4 shadow-md rounded-xl border border-black">
                <div className="text-sm text-gray-600 mb-1">Transaction ID</div>
                <div className="text-sm font-medium text-gray-800 mb-2">{tx.transactionId}</div>
                <div className="border-t border-gray-300 my-2" />
                <div className="flex justify-between text-sm mb-1">
                  <div>
                    <div className="text-gray-600">Date</div>
                    <div className="text-gray-700 font-medium">{new Date(tx.date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Type</div>
                   <div className={`font-semibold ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
  {tx.type === 'Debit Error' ? 'Debit' : tx.type}
</div>

                  </div>
                </div>
                <div className="border-t border-gray-300 my-2" />
                <div className="text-sm mb-1">
                  <div className="text-gray-600">Description</div>
                  <div className="text-gray-700 font-medium">{tx.description}</div>
                </div>
                <div className="border-t border-gray-300 my-2" />
                <div className="flex justify-between text-sm mt-3">
                  <div>
                    <div className="text-gray-600">Amount</div>
                    <div className="font-semibold text-gray-900">₹{tx.amount}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Balance</div>
                    <div className="text-gray-700">₹{tx.balance}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block">
          {reversedTransactions.length === 0 ? (
            <p className="text-center text-gray-600 mt-8">No transactions found.</p>
          ) : (
            <table className="w-full table-auto border-collapse bg-white shadow rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="p-2">Transaction ID</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {reversedTransactions.map((tx, i) => (
                  <tr key={i} className="border-t text-sm">
                    <td className="p-2">{tx.transactionId}</td>
                    <td className="p-2">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="p-2">{tx.description}</td>
                    <td className={`p-2 ${tx.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>{tx.type}</td>
                    <td className="p-2">₹{tx.amount}</td>
                    <td className="p-2">₹{tx.balance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default Transactions;
