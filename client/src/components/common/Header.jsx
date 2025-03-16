// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../features/auth/authSlice";
// import { ShoppingCart, User } from "lucide-react";

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { userInfo } = useSelector((state) => state.auth);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   const handleProfileClick = () => {
//     if (userInfo) {
//       navigate("/profile");
//     } else {
//       navigate("/login");
//     }
//   };

//   const handleCartClick = () => {
//     if (userInfo) {
//       navigate("/cart");
//     } else {
//       navigate("/login");
//     }
//   };

//   return (
//     <header className="bg-white text-black">
//       <div className="container mx-auto flex justify-between items-center px-4 py-3">
//         <Link to="/" className="text-xl font-bold">
//           Single Window
//         </Link>

//         <nav>
//           <ul className="flex space-x-4 items-center">
//             <li>
//               <Link to="/" className="hover:text-gray-300">
//                 Home
//               </Link>
//             </li>

//             {/* Show "Shop" to guests and customers, but not Admins */}
//             {(!userInfo || userInfo.role === "customer") && (
//               <li>
//                 <Link to="/products" className="hover:text-gray-300">
//                   Shop
//                 </Link>
//               </li>
//             )}

//             {/* Cart Icon - Only visible if logged in as a Customer */}
//             {userInfo && userInfo.role === "customer" && (
//               <li>
//                 <button onClick={handleCartClick} className="hover:text-gray-300">
//                   <ShoppingCart size={22} />
//                 </button>
//               </li>
//             )}

//             {/* Profile Icon - Always visible */}
//             <li>
//               <button onClick={handleProfileClick} className="hover:text-gray-300">
//                 <User size={22} />
//               </button>
//             </li>

//             {/* Admin Controls */}
//             {userInfo && userInfo.role === "admin" && (
//               <>
//                 <li>
//                   <Link to="/admin/dashboard" className="hover:text-gray-300">
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/products" className="hover:text-gray-300">
//                     Products
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/orders" className="hover:text-gray-300">
//                     Orders
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/admin/wood-types" className="hover:text-gray-300">
//                     Wood Types
//                   </Link>
//                 </li>
//               </>
//             )}

//             {/* Login/Register or Logout */}
//             {!userInfo ? (
//               <>
//                 <li>
//                   <Link to="/login" className="hover:text-gray-300">
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/register" className="hover:text-gray-300">
//                     Register
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <li>
//                 <button onClick={handleLogout} className="hover:text-gray-300">
//                   Logout
//                 </button>
//               </li>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { ShoppingCart, User, Menu, X, Home, ShoppingBag, LayoutDashboard, Package, ClipboardList, LogOut, LogIn, UserPlus, TreesIcon as Tree } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    if (userInfo) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
    setIsOpen(false);
  };

  const handleCartClick = () => {
    if (userInfo) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-999 shadow-lg py-5 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
          : "bg-white py-3"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold flex items-center space-x-2 text-gray-800">
          <span>Single Window</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link to="/" className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
                <Home size={18} />
                <span>Home</span>
              </Link>
            </li>

            {(!userInfo || userInfo.role === "customer") && (
              <li>
                <Link to="/products" className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
                  <ShoppingBag size={18} />
                  <span>Shop</span>
                </Link>
              </li>
            )}

            {userInfo && userInfo.role === "customer" && (
              <li>
                <button 
                  onClick={handleCartClick} 
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <ShoppingCart size={18} />
                  <span>Cart</span>
                </button>
              </li>
            )}

            {userInfo && userInfo.role === "admin" && (
              <>
                <li>
                  <Link to="/admin/dashboard" className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/products" className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
                    <Package size={18} />
                    <span>Products</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/orders" className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
                    <ClipboardList size={18} />
                    <span>Orders</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/wood-types" className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors">
                    <Tree size={18} />
                    <span>Wood Types</span>
                  </Link>
                </li>
              </>
            )}

            <li>
              <button 
                onClick={handleProfileClick} 
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <User size={18} />
                <span>{userInfo ? "Profile" : "Account"}</span>
              </button>
            </li>

            {!userInfo ? (
              <li>
                <Link 
                  to="/login" 
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center gap-1"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
              </li>
            ) : (
              <li>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none" 
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 bg-gray-100 bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />
      
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button 
            className="text-gray-700 hover:text-gray-900 focus:outline-none" 
            onClick={toggleMenu}
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="px-4 py-2 border-b bg-white">
          <Link 
            to="/" 
            className="text-xl font-bold text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Single Window
          </Link>
        </div>
        
        <nav className="px-4 py-4 bg-white min-h-full">
          <ul className="space-y-4">
            <li>
              <Link 
                to="/" 
                className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
            </li>

            {(!userInfo || userInfo.role === "customer") && (
              <li>
                <Link 
                  to="/products" 
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag size={20} />
                  <span>Shop</span>
                </Link>
              </li>
            )}

            {userInfo && userInfo.role === "customer" && (
              <li>
                <button 
                  onClick={handleCartClick} 
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2 w-full text-left"
                >
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                </button>
              </li>
            )}

            <li>
              <button 
                onClick={handleProfileClick} 
                className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2 w-full text-left"
              >
                <User size={20} />
                <span>{userInfo ? "Profile" : "Account"}</span>
              </button>
            </li>

            {userInfo && userInfo.role === "admin" && (
              <>
                <li className="pt-2 border-t">
                  <div className="text-sm font-semibold text-gray-500 mb-2">Admin Controls</div>
                </li>
                <li>
                  <Link 
                    to="/admin/dashboard" 
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/products" 
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Package size={20} />
                    <span>Products</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/orders" 
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <ClipboardList size={20} />
                    <span>Orders</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/wood-types" 
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Tree size={20} />
                    <span>Wood Types</span>
                  </Link>
                </li>
              </>
            )}

            <li className="pt-2 border-t">
              {!userInfo ? (
                <div className="space-y-3 pt-2">
                  <Link 
                    to="/login" 
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserPlus size={20} />
                    <span>Register</span>
                  </Link>
                </div>
              ) : (
                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors py-2 w-full text-left mt-2"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;