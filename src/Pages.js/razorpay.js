import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

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
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Money to Wallet</h2>
      <form onSubmit={handlePayment} className="space-y-4">
        <input
          type="number"
          placeholder="Enter amount (in INR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-4 py-2"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Pay with Razorpay
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
