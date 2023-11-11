import { createSlice } from '@reduxjs/toolkit';

const wardSlice = createSlice({
  name: 'ward',
  initialState: {
    ward: [],
    error: null,
  },
  reducers: {
    fetchDataWardSuccess: (state, action) => {
      state.ward = action.payload;
      state.error = null;
    },
    fetchDataWardFail: (state, action) => {
      state.ward = [];
      state.error = action.payload;
    },
  },
});

export const { fetchDataWardFail, fetchDataWardSuccess } = wardSlice.actions;
export default wardSlice.reducer;
