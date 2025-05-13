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
  X,
  Menu, // This is the correct hamburger icon (three horizontal lines)
} from 'lucide-react';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const menuItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/Dashboard' },
    { label: 'Transactions', icon: <Receipt size={20} />, path: '/transactions' },
    { label: 'Hyundai Service History', icon: <Car size={20} />, path: '/h-service-Response' },
    { label: 'Maruti Suzuki Service History', icon: <Car size={20} />, path: '/M-service-Response' },
    { label: 'Mahindra Service History', icon: <Car size={20} />, path: '/Mh-service-Response' },
    { label: 'RC Verification', icon: <ShieldCheck size={20} />, path: '/RC-Response' },
    { label: 'Challan Check', icon: <BadgeIndianRupee size={20} />, path: '/challan-Response' },
    { label: 'Bank Account Verification', icon: <CreditCard size={20} />, path: '/Bank-Response' },
    { label: 'PAN Verification', icon: <IdCard size={20} />, path: '/Pan-Response' },
    { label: 'Aadhar Verification', icon: <Contact size={20} />, path: '/Aadhar-Response' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };
  const handleLogoClick = () => {
    navigate('/Dashboard');
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Top Bar */}
      <nav className="flex justify-between items-center bg-white text-black px-4 py-1 shadow-md">
  <button
    onClick={() => setOpen(!open)}
    className="text-black text-2xl"
    aria-label="Toggle Menu"
  >
    <Menu />
  </button>
  <div className="text-xl font-bold tracking-wide">
      <img
        src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746554424/WhatsApp_Image_2025-05-06_at_23.27.00_2c781bc6_bntx08.jpg"
        alt="Logo"
        className="h-12 cursor-pointer"
        onClick={handleLogoClick}
      />
    </div>

</nav>



      {/* Sidebar */}
      {open && (
        <div className="fixed top-0 left-0 w-3/4 h-full bg-blue-900 text-white z-50 shadow-2xl transition-transform duration-300 ease-in-out">
          <div className="flex justify-between items-center px-4 py-4 border-b border-blue-800">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-2xl"
              aria-label="Close Menu"
            >
              <X />
            </button>
          </div>

          <ul className="p-4 space-y-3">
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
        </div>
      )}
    </div>
  );
}
