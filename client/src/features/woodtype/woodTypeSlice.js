// src/slices/woodTypeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchWoodTypes = createAsyncThunk(
  'woodTypes/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/wood');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch wood types');
    }
  }
);

export const addWoodType = createAsyncThunk(
  'woodTypes/add',
  async (woodTypeData, { rejectWithValue }) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const response = await api.post('/api/wood', woodTypeData, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add wood type');
    }
  }
);

export const updateWoodType = createAsyncThunk(
  'woodTypes/update',
  async ({ id, woodTypeData }, { rejectWithValue }) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const response = await api.put(`/api/wood/${id}`, woodTypeData, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update wood type');
    }
  }
);

export const deleteWoodType = createAsyncThunk(
  'woodTypes/delete',
  async (id, { rejectWithValue }) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await api.delete(`/api/wood/${id}`, config);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete wood type');
    }
  }
);

const woodTypeSlice = createSlice({
  name: 'woodTypes',
  initialState: {
    woodTypes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Wood Types
      .addCase(fetchWoodTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWoodTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.woodTypes = action.payload;
      })
      .addCase(fetchWoodTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Wood Type
      .addCase(addWoodType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWoodType.fulfilled, (state, action) => {
        state.loading = false;
        state.woodTypes.push(action.payload);
      })
      .addCase(addWoodType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Wood Type
      .addCase(updateWoodType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWoodType.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.woodTypes.findIndex((wt) => wt._id === action.payload._id);
        if (index !== -1) {
          state.woodTypes[index] = action.payload;
        }
      })
      .addCase(updateWoodType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Wood Type
      .addCase(deleteWoodType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWoodType.fulfilled, (state, action) => {
        state.loading = false;
        state.woodTypes = state.woodTypes.filter((wt) => wt._id !== action.payload);
      })
      .addCase(deleteWoodType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default woodTypeSlice.reducer;
