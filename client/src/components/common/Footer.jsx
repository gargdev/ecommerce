import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black px-10 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold">Single Window.</h2>
            <p className="text-gray-500 mt-4">
              Chhatarpur <br />
              New Delhi India
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-gray-500 font-medium">Links</h3>
            <ul className="mt-4 space-y-2">
            <Link to="/"><li className="hover:underline cursor-pointer">Home</li></Link>
              <Link to="/products"><li className="hover:underline cursor-pointer">Shop</li></Link>
              <li className="hover:underline cursor-pointer">About</li>
              <li className="hover:underline cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-gray-500 font-medium">Help</h3>
            <ul className="mt-4 space-y-2">
              <li className="hover:underline cursor-pointer">Payment Options</li>
              <li className="hover:underline cursor-pointer">Returns</li>
              <li className="hover:underline cursor-pointer">Privacy Policies</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-gray-500 font-medium">Newsletter</h3>
            <div className="mt-4 flex items-center border-b border-black">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="flex-1 bg-transparent outline-none text-gray-500"
              />
              <button className="font-bold text-black hover:underline">SUBSCRIBE</button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-sm text-gray-500 text-center">
          <p>2025 Single Window. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
