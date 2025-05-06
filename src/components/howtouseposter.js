// MotivationSection.js
import React from 'react';
import { Link } from 'react-router-dom';
const PosterSection = () => {
    const cards = [
        {
            image: "https://res.cloudinary.com/dunsl7vvf/image/upload/v1744846885/coding_nldtpq.jpg",
            description: "Explore our services and choose one to get a quick response.",
        },
        {
            image: "https://res.cloudinary.com/dunsl7vvf/image/upload/v1744845827/online-mobile-banking-banner-woman-hand-hold-mobile-phone-with-payment-successful-inscription-digital-transaction-concept-with-copy-space-photo_526934-452_knmw2q.png",
            description: "Make a payment through your wallet or payment gateway.",
        },
        {
            image: "https://res.cloudinary.com/dunsl7vvf/image/upload/v1744846179/WhatsApp_Image_2025-04-17_at_04.59.02_f50bf5ce_bklfiw.jpg",
            description: "Get an instant response and enjoy complete transparency.",
        },
       
    ];

    return (
        <div className="p-7 border-b border-gray-300">
            {/* Border Above Section */}
            <div className="border-t border-gray-200 mb-0"></div>

            {/* Heading Section */}
            <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center tracking-wide">
                    HOW TO USE!!
                </h2>
                {/* Underline below Heading */}
                <div className="border-b-2 border-blue-500 w-24 mx-auto mt-2"></div>
            </div>

            {/* Card Section */}
            <div className="overflow-hidden">
                <div className="flex gap-6 overflow-x-scroll snap-x sm:overflow-visible sm:grid sm:grid-cols-3">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-4/5 sm:w-auto bg-white rounded-lg shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105 snap-center"
                        >
                            <img
                                src={card.image}
                                alt={`Card ${index + 1}`}
                                className="w-full h-61 object-cover rounded-t-lg"
                            />
                            <div className="p-6 space-y-2">
                                <p className="text-lg font-medium text-gray-800">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sell Your Car Button */}
            <div className="flex justify-center mt-3 mb-1">
            <Link to="/sell">
    <button className="bg-white text-blue-600 px-5 py-3 rounded-full shadow-md border border-blue-600 hover:bg-blue-50 transition-transform duration-200 hover:scale-105">
      Explore Now
    </button>
</Link>
            </div>
        </div>
    );
};

export default PosterSection;
