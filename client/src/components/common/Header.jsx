import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-xl font-bold">Furniture E-commerce</Link>
        <nav>
          <ul className="flex space-x-4">
            
            
            {/* Show Cart only if user is logged in as Customer */}
            {userInfo && userInfo.role === 'customer' && (
              <>
              <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-gray-300">Products</Link>
            </li>
              <li>
                <Link to="/cart" className="hover:text-gray-300">Cart</Link>
              </li>
              </>
            )}

            {/* Show Admin Controls if user is Admin */}
            {userInfo && userInfo.role === 'admin' && (
              <>
                <li>
                  <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/products" className="hover:text-gray-300">Products</Link>
                </li>
                <li>
                  <Link to="/admin/orders" className="hover:text-gray-300">Orders</Link>
                </li>
                <li>
                  <Link to="/admin/wood-types" className="hover:text-gray-300">Wood Types</Link>
                </li>
              </>
            )}

            {!userInfo ? (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-300">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-300">Register</Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={handleLogout} className="hover:text-gray-300">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
