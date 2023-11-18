import { createSlice } from '@reduxjs/toolkit'

const registerSclice = createSlice({
    name: 'register',
    initialState: {
        register: [],
        error: null
    },
    
    reducers: {
        fetchDataRegisterSuccess: (state, action) => {
            state.register = action.payload;
            state.error = null
        },

        fetchDataRegisterFail: (state, action) => {
            state.register = null;
            state.error = action.payload
        }
    }
})

export const {fetchDataRegisterFail, fetchDataRegisterSuccess} = registerSclice.actions;
export default registerSclice.reducer;