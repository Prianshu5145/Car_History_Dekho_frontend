import React from 'react';
import Home from '../src/Pages.js/Home.js';
import { Route, Routes} from 'react-router-dom';
import Logout from './Pages.js/logout.js';
import Login from './Pages.js/login.js';
import Dashboard from './Pages.js/Dashboard.js'
import HyundaiResponse from './Pages.js/hyundaiservice'
import MarutiResponse from './Pages.js/marutiservice.js';
import MahindraResponse from './Pages.js/Mahindraservice';
import RCResponse from './Pages.js/RCverification';
import PanResponse from './Pages.js/Panverification';
import ChallanResponse from './Pages.js/challan';
import BankResponse from './Pages.js/BankAccount';
import PaymentPage from './Pages.js/razorpay.js'
import AadhaarResponse from './Pages.js/Aadharcard.js'
function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/h-service-Response" element={<HyundaiResponse />} />
      <Route path="/M-service-Response" element={<MarutiResponse />} />
      <Route path="/Mh-service-Response" element={<MahindraResponse />} />
      <Route path="/RC-Response" element={<RCResponse />} />
      <Route path="/Pan-Response" element={<PanResponse />} />
      <Route path="/challan-Response" element={<ChallanResponse />} />
      <Route path="/Bank-Response" element={<BankResponse />} />
      <Route path="/Payment-Page" element={<PaymentPage />} />
      <Route path="/Aadhar-Response" element={<AadhaarResponse />} />

      </Routes>
    </div>
  );
}

export default App;
