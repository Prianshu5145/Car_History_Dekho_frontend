import React from 'react';
import { Link } from 'react-router-dom';

const serviceCards = [
  {
    to: "/login",
    title: "Odometer Record + Service History",
    description:
      "Cheapest Platform for Car Dealers to Instantly Check Service History and Odometer Record of a Vehicle at Just ₹25.",
    image: "/images/odometer.png",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  {
    to: "/login",
    title: "RC Verification",
    description:
      "Verify vehicle ownership, make, model, manufacturing year, chassis number, engine number, hypothecation status, and registration details instantly — all in just a click.",
    image:
      "https://res.cloudinary.com/dunsl7vvf/image/upload/v1744840037/WhatsApp_Image_2025-04-17_at_03.08.49_a850789e_vctjzf.jpg",
    gradient: "bg-gradient-to-r from-purple-500 to-indigo-600",
  },
  {
    to: "/login",
    title: "Challan Check",
    description:
      "Check for traffic challans against the vehicle, including offence details and fine amounts, to avoid surprises and make a smart, informed purchase.",
    image: "/images/challan.png",
    gradient: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
  {
    to: "/login",
    title: "Identity Verification",
    description:
      "Verify the owner's identity using PAN and Aadhaar details to ensure secure and trustworthy transactions before making a purchase or sale.",
    image: "/images/identity-verification.png",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
];

const ServiceCard = ({ title, description, image, gradient }) => {
  return (
    <div
      className={`rounded-2xl text-center p-6 w-full shadow-xl transform transition duration-300 hover:scale-105 text-white ${gradient} h-full`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-lg opacity-90">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="bg-white pt-10 px-4 pb-2">
      <div className="border-t border-gray-200 mb-0"></div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Smart Dealer Services
      </h1>

      {/* Uniform Card Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {serviceCards.map((card, index) => (
          <Link key={index} to={card.to} className="block h-full">
            <ServiceCard
              title={card.title}
              description={card.description}
              image={card.image}
              gradient={card.gradient}
            />
          </Link>
        ))}
      </div>

      <div className="lg:hidden border-t border-gray-200 mt-6 mb-0"></div>

     {/* Mobile Image */}
<img
  src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1744847232/WhatsApp_Image_2025-04-17_at_05.15.51_d977d103_qbueyw.jpg"
  alt="Used car for sale mobile"
  className="w-full max-w-screen-sm mt-6 mx-auto h-auto block lg:hidden"
/>

{/* Laptop Image */}
<img
  src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746563632/Your_paragraph_text_1_srbl66.png"
  alt="Used car for sale laptop"
  className="w-full mt-10 mx-auto h-auto hidden lg:block"
/>

    </div>
  );
};

export default Services;
