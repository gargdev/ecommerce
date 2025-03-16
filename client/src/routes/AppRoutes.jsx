import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

// Admin pages
import Dashboard from '../pages/admin/Dashboard';
import ManageProducts from '../pages/admin/ManageProducts';
import ManageOrders from '../pages/admin/ManageOrders';
import ManageWoodTypes from '../pages/admin/ManageWoodTypes';
import AddProduct from '../pages/admin/AddProduct';

import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
   <>
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />
      <Route
        path="/order-confirmation"
        element={
          <PrivateRoute>
            <OrderConfirmation />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute adminRequired={true}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/product/new"
        element={
          <PrivateRoute adminRequired={true}>
            <AddProduct />
          </PrivateRoute>
        }
      />
       <Route
        path="/admin/product/edit/:id"
        element={
          <PrivateRoute adminRequired={true}>
            <AddProduct />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <PrivateRoute adminRequired={true}>
            <ManageProducts />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <PrivateRoute adminRequired={true}>
            <ManageOrders />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/wood-types"
        element={
          <PrivateRoute adminRequired={true}>
            <ManageWoodTypes />
          </PrivateRoute>
        }
      />
    </Routes>
   </>
  );
};

export default AppRoutes;
