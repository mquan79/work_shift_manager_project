import { createSlice } from '@reduxjs/toolkit';

const provinceSlice = createSlice({
  name: 'province',
  initialState: {
    province: [],
    error: null,
  },
  reducers: {
    fetchDataProvinceSuccess: (state, action) => {
      state.province = action.payload;
      state.error = null;
    },
    fetchDataProvinceFail: (state, action) => {
      state.province = [];
      state.error = action.payload;
    },
  },
});

export const { fetchDataProvinceFail, fetchDataProvinceSuccess } = provinceSlice.actions;
export default provinceSlice.reducer;
