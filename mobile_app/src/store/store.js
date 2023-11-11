import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import workerReducer from './Slice/workerSlice'
import workshiftReducer from './Slice/workshiftSlice'
import provinceReducer from './Slice/provinceSlice'
import districtsReducer from './Slice/districtsSlice'
import wardReducer from './Slice/wardSlice'
import historyReducer from './Slice/historyPickerSlice'
import qrcodeReducer from './Slice/qrcodesSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    workshift: workshiftReducer,
    worker: workerReducer,
    province: provinceReducer,
    districts: districtsReducer,
    ward: wardReducer,
    history: historyReducer,
    qrcode: qrcodeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: false, 
      actionCreatorCheck: true,
    }),
});


export default store;
