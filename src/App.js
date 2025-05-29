import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../src/Pages.js/Home.js';
import Login from './Pages.js/login.js';
import Logout from './Pages.js/logout.js';
import Dashboard from './Pages.js/Dashboard.js';
import HyundaiResponse from './Pages.js/hyundaiservice';
import MarutiResponse from './Pages.js/marutiservice.js';
import MahindraResponse from './Pages.js/Mahindraservice';
import RCResponse from './Pages.js/RCverification';
import PanResponse from './Pages.js/Panverification';
import ChallanResponse from './Pages.js/challan';
import BankResponse from './Pages.js/BankAccount';
import AadhaarResponse from './Pages.js/Aadharcard.js';
import Transactions from './Pages.js/transaction.js';
import Profile from './Pages.js/Profile.js';
import ProtectedRoute from './components/ProtectedRoute';
import DataProcessingAgreement from './components/DPA';
import TermsAndConditions from './components/T&C';
import PrivacyPolicy from './components/privacypolicy'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes */}
       
          <Route path="/Dashboard" element={<Dashboard />} />
          
          <Route path="/h-service-Response" element={<HyundaiResponse />} />
          <Route path="/buy" element={<Home />} />
           <Route path="/Gallery" element={<Home />} />
            <Route path="/M-service-Response" element={<MarutiResponse />} />
            <Route path="/Mh-service-Response" element={<MahindraResponse />} />
            <Route path="/RC-Response" element={<RCResponse />} />
            <Route path="/Pan-Response" element={<PanResponse />} />
            <Route path="/challan-Response" element={<ChallanResponse />} />
            <Route path="/Bank-Response" element={<BankResponse />} />
            <Route path="/Aadhar-Response" element={<AadhaarResponse />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Dpa" element={< DataProcessingAgreement/>} />
          <Route path="/T&C" element={< TermsAndConditions/>} />
          <Route path="/privacypolicy" element={< PrivacyPolicy/>} />
        
      </Routes>
    </div>
  );
}

export default App;
