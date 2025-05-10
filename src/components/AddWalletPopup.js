// components/AddWalletPopup.js
import { X } from 'lucide-react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import numWords from 'num-words';
import { useNavigate } from 'react-router-dom';

const AddWalletPopup = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script dynamically once
  useEffect(() => {
    if (!razorpayLoaded) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => alert('Failed to load Razorpay. Please refresh.');
      document.body.appendChild(script);
    }
  }, [razorpayLoaded]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount)) return alert("Enter a valid amount");

    if (typeof window.Razorpay === 'undefined') {
      return alert("Razorpay SDK not loaded yet. Please try again.");
    }

    try {
      const { data } = await axios.post(
        'https://car-history-dekho-backend-production.up.railway.app/api/payment/create-order',
        { amount },
        { withCredentials: true }
      );

      const options = {
        key: 'rzp_live_bVtFI334cjlPRn',
        amount: data.order.amount,
        currency: 'INR',
        name: 'Car History Dekho',
        description: 'Wallet Recharge',
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              'https://car-history-dekho-backend-production.up.railway.app/api/payment/verify',
              { ...response, amount: Number(amount) },
              { withCredentials: true }
            );

            alert('Payment Successful! New Balance: ₹' + verifyRes.data.newBalance);
            if (onSuccess) onSuccess(verifyRes.data.newBalance);
            navigate('/Dashboard');
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
    } finally {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] md:w-[75%] max-h-[90vh] overflow-auto rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Add Wallet Balance</h2>

        <form onSubmit={handlePayment} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Select Currency</label>
            <select disabled className="w-full border px-4 py-2 rounded-lg bg-gray-100 cursor-not-allowed">
              <option>Indian Rupees (INR)</option>
            </select>
          </div>

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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={!razorpayLoaded}
          >
            {razorpayLoaded ? "Add Balance" : "Loading Razorpay..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWalletPopup;
