import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-8 py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Furniture E-commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
