import { createSlice } from '@reduxjs/toolkit';

const districtsSlice = createSlice({
  name: 'districts',
  initialState: {
    districts: [],
    error: null,
  },
  reducers: {
    fetchDataDistrictsSuccess: (state, action) => {
      state.districts = action.payload;
      state.error = null;
    },
    fetchDataDistrictsFail: (state, action) => {
      state.districts = [];
      state.error = action.payload;
    },
  },
});

export const { fetchDataDistrictsFail, fetchDataDistrictsSuccess } = districtsSlice.actions;
export default districtsSlice.reducer;
