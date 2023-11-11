import { createSlice } from '@reduxjs/toolkit'

const workerSclice = createSlice({
    name: 'worker',
    initialState: {
        worker: [],
        error: null
    },
    
    reducers: {
        fetchDataWorkerSuccess: (state, action) => {
            state.worker = action.payload;
            state.error = null
        },

        fetchDataWorkerFail: (state, action) => {
            state.worker = null;
            state.error = action.payload
        }
    }
})

export const {fetchDataWorkerFail, fetchDataWorkerSuccess} = workerSclice.actions;
export default workerSclice.reducer;