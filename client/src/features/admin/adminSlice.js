import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

// Async thunk to fetch all admin orders
export const fetchAdminOrders = createAsyncThunk(
  'admin/fetchAdminOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const response = await api.get('/api/admin/orders', config);
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update an order's status
export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ orderId, newStatus }, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const response = await api.put(`/api/admin/order/${orderId}`, { status: newStatus }, config);
      return response.data.order; // Assuming the response returns the updated order
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    // Separate substate for order update
    update: {
      loading: false,
      error: null,
      success: false,
      order: null,
    },
  },
  reducers: {
    // Reset update state when needed
    resetUpdate(state) {
      state.update = {
        loading: false,
        error: null,
        success: false,
        order: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Admin Orders
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || 'Failed to fetch admin orders';
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.update.loading = true;
        state.update.success = false;
        state.update.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.update.loading = false;
        state.update.order = action.payload;
        state.update.success = true;
        // Optionally update the order in the orders array if it exists
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.update.loading = false;
        state.update.error = action.payload.message || 'Failed to update order status';
        state.update.success = false;
      });
  },
});

export const { resetUpdate } = adminSlice.actions;
export default adminSlice.reducer;
