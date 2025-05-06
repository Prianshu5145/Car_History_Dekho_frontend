import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes ,FaEnvelope} from 'react-icons/fa'; 
import { useAuth } from '../Contexts/AuthContext'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, role } = useAuth(); 
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn) {
      setMenuOpen(false);
    }
  }, [isLoggedIn]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white p-2 flex items-center justify-between z-50 relative border-t border-b border-gray-300 shadow-sm">
    
  {/* Logo */}
  <Link to="/" className="text-lg font-bold mr-6">
    <img
      src="https://res.cloudinary.com/dunsl7vvf/image/upload/v1746554424/WhatsApp_Image_2025-05-06_at_23.27.00_2c781bc6_bntx08.jpg"
      alt="Trust N Ride Logo"
      className="h-14 w-auto"
    />
  </Link>
  <Link
    to="/Dashboard"
    className="md:hidden mr-5  bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2 px-2 rounded transition duration-500"
  >
    Dashboard Login
  </Link>

  {/* Desktop Menu */}
  <div className="hidden md:flex items-center flex-1">
    {/* Start with some space using ml-10 */}
    <div className="flex space-x-12 text-lg ml-20">
      <Link to="/gallery" className="hover:text-gray-400">Home</Link>
      <Link to="/buy" className="hover:text-gray-400">Solutions</Link>
      <Link to="/sell" className="hover:text-gray-400">Contact Us</Link>
    </div>

    {/* Push login button to far right using ml-auto */}
    <div className="flex items-center ml-auto space-x-4">
  <Link
    to="/login"
    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded transition duration-500"
  >
    Dashboard Login
  </Link>
  <Link
    to="/contact"
    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded transition duration-500"
  >
    Contact Sales
  </Link>
</div>

  </div>

      {/* Mobile Menu Button */}
<div className="md:hidden">
  {!isLoggedIn ? (
    <button onClick={toggleMenu} className="text-black ml-auto text-lg">
      {menuOpen ? (
        <FaTimes className="h-6 w-6" />
      ) : (
        <FaBars className="h-6 w-6" />
      )}
    </button>
  ) : (
    <button onClick={toggleMenu} className="text-black ml-auto text-lg">
      {menuOpen ? (
        <FaTimes className="h-6 w-6" />
      ) : (
        <FaBars className="h-6 w-6" />
      )}
    </button>
  )}
</div>

{/* Mobile Dropdown Menu */}
{menuOpen && (
  <div className="md:hidden absolute top-16 right-0 bg-gray-900 text-white w-full rounded z-50 shadow-lg text-lg">

    {/* Common Dropdown Menu for NOT Logged In */}
    {!isLoggedIn && (
      <>
        <Link to="/Home" className="block px-4 py-2 hover:bg-gray-600">Home</Link>
        <Link to="/login" className="block px-4 py-2 hover:bg-gray-600">Dashboard Login</Link>
        <Link to="/sell" className="block px-4 py-2 hover:bg-gray-600">Solutions</Link>
       
        <Link to="/contact" className="block px-4 py-2 hover:bg-gray-600">Contact Us</Link>
      </>
    )}

    {/* Dropdown Menu for Logged In Users */}
    {isLoggedIn && (
      <>
        <Link to="/profile" className="block px-4 py-2 hover:bg-gray-600">Profile</Link>
        <Link to="/logout" className="block px-4 py-2 hover:bg-gray-600">Logout</Link>

        {role === 'buyer' && (
          <>
            <Link to="/buy" className="block px-4 py-2 hover:bg-gray-600">Buy a Car</Link>
            <Link to="/sell" className="block px-4 py-2 hover:bg-gray-600">Sell a Car</Link>
            <Link to="/sell" className="block px-4 py-2 hover:bg-gray-600">Book Inspection of Car</Link>
          </>
        )}

        {role === 'Employee' && (
          <>
            <Link to="/create-listing" className="block px-4 py-2 hover:bg-gray-600">Create Listing</Link>
            <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-600">My Listings</Link>
            <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-600">Update Your Listing</Link>
            <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-600">Delete Your Listing</Link>
            <Link to="/rtodoc" className="block px-4 py-2 hover:bg-gray-600">Dispatch RTO DOC</Link>
            <Link to="/viewnoc" className="block px-4 py-2 hover:bg-gray-600">View RTO DOC</Link>
            <Link to="/purchasetoken" className="block px-4 py-2 hover:bg-gray-600">Purchase Token Invoice</Link>
            <Link to="/purchaseDeal" className="block px-4 py-2 hover:bg-gray-600">Purchase Deal Invoice</Link>
            <Link to="/Selltoken" className="block px-4 py-2 hover:bg-gray-600">Sale Token Invoice</Link>
            <Link to="/SellDeal" className="block px-4 py-2 hover:bg-gray-600">Sell Deal Invoice</Link>
          </>
        )}

        {role === 'admin' && (
          <>
            <Link to="/update-listing" className="block px-4 py-2 hover:bg-gray-600">Update Listing</Link>
            <Link to="/delete-listing" className="block px-4 py-2 hover:bg-gray-600">Delete Listing</Link>
            <Link to="/uploadReview" className="block px-4 py-2 hover:bg-gray-600">Update Gallery</Link>
            <Link to="/create-bidding" className="block px-4 py-2 hover:bg-gray-600">Create Bidding Listing</Link>
            <Link to="/approve-dealer" className="block px-4 py-2 hover:bg-gray-600">Approve Dealer</Link>
          </>
        )}
      </>
    )}
  </div>
)}

    </nav>
  );
};

export default Navbar;
