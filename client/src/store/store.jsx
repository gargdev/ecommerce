// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/orders/orderSlice';
import adminReducer from '../features/admin/adminSlice';
import woodTypeReducer from '../features/woodtype/woodTypeSlice'; // Adjust the path as needed


const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    admin: adminReducer,
    woodTypes: woodTypeReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Redux Thunk is included by default
});

export default store;
