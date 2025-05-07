import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-16">
        {/* Logo and About Section */}
        <div className="mb-10 md:mb-16 flex flex-col items-center md:flex-row md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">CAR HISTORY DEKHO</h2>
            <p className="text-gray-400 leading-relaxed max-w-lg text-center md:text-left">
              Car History Dekho empowers dealers with accurate vehicle history, helping them build trust with customers and streamline the buying and selling process.
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex justify-center space-x-6">
            <a href="/" className="text-gray-400 hover:text-white transition">
              <FaFacebookF size={24} />
            </a>
            <a href="/" className="text-gray-400 hover:text-white transition">
              <FaTwitter size={24} />
            </a>
            <a href="/" className="text-gray-400 hover:text-white transition">
              <FaInstagram size={24} />
            </a>
            <a href="/" className="text-gray-400 hover:text-white transition">
              <FaLinkedinIn size={24} />
            </a>
            <a href="/" className="text-gray-400 hover:text-white transition">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Explore & Contact Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-10">
          {/* Explore Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Explore</h3>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/" className="hover:text-blue-500 transition">Home</a></li>
              <li><a href="/Sell" className="hover:text-blue-500 transition">Dashboard Login</a></li>
              <li><a href="/buy" className="hover:text-blue-500 transition">Solutions</a></li>
              <li><a href="/Gallery" className="hover:text-blue-500 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Get in Touch</h3>
            <p className="text-gray-400 mb-2">
              Email: 
              <a href="mailto:team@carhistorydekho.in" className="text-blue-400 hover:text-blue-500 transition ml-1">
                team@carhistorydekho.in
              </a>
            </p>
            <p className="text-gray-400">
              For support or inquiries, feel free to reach us anytime. We are here to assist you.
            </p>
          </div>

          {/* Registered Office Address (Optional) */}
          {/* Add a registered office address if needed */}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center flex-wrap gap-4">
            {/* Copyright Text */}
            <p className="text-gray-500 text-sm">© 2025 CAR HISTORY DEKHO. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
