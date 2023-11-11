import { createSlice } from '@reduxjs/toolkit'

const qrcodeSclice = createSlice({
    name: 'qrcode',
    initialState: {
        qrcode: [],
        error: null
    },
    
    reducers: {
        fetchDataQrcodeSuccess: (state, action) => {
            state.qrcode = action.payload;
            state.error = null
        },

        fetchDataQrcodeFail: (state, action) => {
            state.qrcode = null;
            state.error = action.payload
        }
    }
})

export const {fetchDataQrcodeFail, fetchDataQrcodeSuccess} = qrcodeSclice.actions;
export default qrcodeSclice.reducer;