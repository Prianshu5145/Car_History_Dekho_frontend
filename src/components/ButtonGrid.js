import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaIdCard,
  FaRegAddressCard,
  FaUniversity,
  FaTachometerAlt,
  FaTools,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const services = [
  {
    to: "/login",
    icon: <FaRegAddressCard size={25} />,
    label: "RC Verification",
    color: "from-indigo-500 to-purple-500",
  },
  {
    to: "/login",
    icon: <FaUniversity size={25} />,
    label: "Bank Account Verification",
    color: "from-green-400 to-emerald-600",
  },
  {
    to: "/login",
    icon: <FaTachometerAlt size={25} />,
    label: "Odometer Record",
    color:  "from-blue-500 to-indigo-600",
  },
  {
    to: "/login",
    icon: <FaTools size={25} />,
    label: "Service History + Accident Report",
    color: "from-pink-500 to-rose-500",
  },
  {
    to: "/login",
    icon: <FaExclamationTriangle size={25} />,
    label: "Challan Check",
    color: "from-red-500 to-orange-600",
  },
  {
    to: "/login",
    icon: <FaIdCard size={25} />,
    label: "ID Proof Verification",
    color: "from-blue-400 to-cyan-500",
  },
];

const ServiceIconsGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 p-4 sm:p-6 text-center">
      {services.map((service, index) => (
        <Link
  to={service.to}
  key={index}
  className="relative bg-white border border-transparent rounded-2xl shadow-sm hover:shadow-md transition-all hover:scale-[1.03] duration-300 p-3 sm:p-4 flex flex-col items-center justify-center overflow-hidden group"
>
  {/* Gradient border glow */}
  <div
    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-30 group-hover:opacity-40 transition-opacity duration-300`}
  />
  
  {/* Foreground content */}
  <div className="relative z-10 flex flex-col items-center">
    {/* Icon Box */}
    <div
      className={`bg-gradient-to-br ${service.color} p-2 rounded-full flex items-center justify-center mb-3`}
      style={{ width: "48px", height: "48px" }}
    >
      <div className="text-white text-[20px]">{service.icon}</div>
    </div>

    <span className="text-sm sm:text-[15px] font-medium text-gray-800 text-center leading-tight">
      {service.label}
    </span>
    <HiArrowRight className="mt-1 text-blue-500 text-lg" />
  </div>
</Link>


      ))}
    </div>
  );
};

export default ServiceIconsGrid;
