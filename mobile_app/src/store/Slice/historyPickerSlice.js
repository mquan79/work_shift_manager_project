import { createSlice } from '@reduxjs/toolkit'

const historySclice = createSlice({
    name: 'history',
    initialState: {
        history: [],
        error: null
    },
    
    reducers: {
        fetchDataHistorySuccess: (state, action) => {
            state.history = action.payload;
            state.error = null
        },

        fetchDataHistoryFail: (state, action) => {
            state.history = null;
            state.error = action.payload
        }
    }
})

export const {fetchDataHistoryFail, fetchDataHistorySuccess} = historySclice.actions;
export default historySclice.reducer;