import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                
                {/* Logo and About Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">TRUST N RIDE</h2>
                    <p className="text-gray-400 leading-relaxed">
                        TRUST N RIDE offers the smoothest way to buy and sell vehicles, ensuring customer satisfaction at every step of the journey.
                    </p>
                </div>

                {/* Explore & Contact Sections */}
                <div className="flex flex-wrap gap-8 justify-between items-start mb-0">
                    
                    {/* Explore Links */}
                    <div className="w-full sm:w-1/2 flex-1">
                        <h3 className="text-xl font-semibold mb-3">Explore</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-blue-500 transition">Home</a></li>
                            <li><a href="/Sell" className="hover:text-blue-500 transition">Services</a></li>
                            <li><a href="/buy" className="hover:text-blue-500 transition">About Us</a></li>
                            <li><a href="/Gallery" className="hover:text-blue-500 transition">Contact Us</a></li>
                            <li><a href="/About" className="hover:text-blue-500 transition">Privacy Policy</a></li>
                            <li><a href="/Contact" className="hover:text-blue-500 transition">T&C Policy</a></li>
                           
                        </ul>
                        <br/>
                        
                        
                    </div>


                    {/* Registered Office Address */}
                    <div className="w-full sm:w-1/2 flex-1">
                        <h3 className="text-xl font-semibold mb-3">Registered Office Address:</h3>
                        <p className="text-gray-400">
                            TRUST N RIDE, Gata Num- 57, Near RING ROAD, Near NEW JAIHERO, Akbarpur, Ratanpur, Ambedkar Nagar, Uttar Pradesh 224122
                        </p>
                        <p className="mt-2 text-gray-400">
                            GSTIN: <span className="font-semibold">09AAVFT6318H1ZJ</span> {/* Example GSTIN */}
                        </p>
                    </div>
                </div>

                {/* Contact Information (Mobile & Email) */}
                <div className="mb-0">
                    <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
                    
                    <div className="mt-3 space-y-2">
                        <p className="text-gray-400">
                            Email: 
                            <a 
                                href="mailto:team@trustnride.in" 
                                className="hover:text-blue-500 transition ml-1"
                            >
                                team@trustnride.in
                            </a>
                        </p>
                        <p className="text-gray-400">
                            Phone: 
                            <a 
                                href="tel:+919792983625" 
                                className="hover:text-blue-500 transition ml-1"
                            >
                                +919792983625
                            </a>
                        </p>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                

                {/* Divider */}
                <div className="border-t border-gray-700 mt-2 pt-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        
                        {/* Copyright Text */}
                        <p className="text-gray-500 text-sm">© 2024 TRUST N RIDE. All rights reserved.</p>

                        {/* Social Media Links */}
                        <div className="flex space-x-6">
                            <a href="/" className="hover:text-blue-500 transition">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="/" className="hover:text-blue-500 transition">
                                <FaTwitter size={20} />
                            </a>
                            <a href="/" className="hover:text-blue-500 transition">
                                <FaInstagram size={20} />
                            </a>
                            <a href="/" className="hover:text-blue-500 transition">
                                <FaLinkedinIn size={20} />
                            </a>
                            <a href="/" className="hover:text-blue-500 transition">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
