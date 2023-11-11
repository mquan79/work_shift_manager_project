import {createSlice} from '@reduxjs/toolkit'

const workshiftSlice = createSlice({
    name: 'workshift',
    initialState: {
        workshift : [],
        error: null,
    },

    reducers: {
        fetchDataWorkshiftSuccess: (state, action) => {
            state.workshift = action.payload;
            state.error = null
        },

        fetchDataWorkshiftFail: (state, action) => {
            state.workshift = [];
            state.error = action.payload
        }
    }
})

export const {fetchDataWorkshiftSuccess, fetchDataWorkshiftFail} = workshiftSlice.actions;
export default workshiftSlice.reducer;