import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  Car,
  ShieldCheck,
  BadgeIndianRupee,
  IdCard,
  CreditCard,
  Contact,
  
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/Dashboard' },
    { label: 'Transactions', icon: <Receipt size={20} />, path: '/transactions' },
    { label: 'Hyundai Service History', icon: <Car size={20} />, path: '/h-service-Response' },
    { label: 'Maruti Suzuki Service History', icon: <Car size={20} />, path: '/M-service-Response' },
    // { label: 'Mahindra Service History', icon: <Car size={20} />, path: '/Mh-service-Response' },
    { label: 'RC Verification', icon: <ShieldCheck size={20} />, path: '/RC-Response' },
    { label: 'Challan Check', icon: <BadgeIndianRupee size={20} />, path: '/challan-Response' },
    { label: 'Bank Account Verification', icon: <CreditCard size={20} />, path: '/Bank-Response' },
    { label: 'PAN Verification', icon: <IdCard size={20} />, path: '/Pan-Response' },
    // { label: 'Aadhar Verification', icon: <Contact size={20} />, path: '/aadhar-verification' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      

      {/* Sidebar */}
      <aside
        className={`bg-blue-900 text-white w-84 p-4 h-screen fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:block`}
      >
        <h2 className="text-2xl font-bold mb-6">CAR HISTORY DEKHO</h2>
        <ul className="space-y-3">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleNavigate(item.path)}
              className="flex items-center gap-3 p-3 rounded-lg text-base font-medium border border-transparent hover:border-white hover:bg-blue-800 hover:shadow-lg transition-all duration-200 cursor-pointer"
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
