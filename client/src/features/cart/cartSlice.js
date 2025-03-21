import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../api/api"

// Fetch the current user's cart
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const response = await api.get('/api/cart', config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Helper function to generate a unique key for cart items
const generateItemKey = (itemData) => {
  const { productId, selectedVariants, length, breadth, height, woodType } = itemData;
  
  // For variant-based products
  if (selectedVariants && Object.keys(selectedVariants).length > 0) {
    // Sort the variant keys to ensure consistent order
    const sortedVariants = Object.entries(selectedVariants)
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    return `${productId}-${JSON.stringify(sortedVariants)}`;
  }
  
  // For customizable products
  if (length && breadth && height && woodType) {
    return `${productId}-${length}-${breadth}-${height}-${woodType}`;
  }
  
  // For simple products
  return productId;
};

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (itemData, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      // Generate a unique key for the item configuration
      const itemKey = generateItemKey(itemData);
      
      const response = await api.post('/api/cart', {
        ...itemData,
        itemKey
      }, config);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


// Remove an item from the cart
export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const response = await api.delete(`/api/cart/${productId}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch cart';
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to add item to cart';
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to remove item from cart';
      });
  },
});

export default cartSlice.reducer;
