import { useEffect } from 'react';
import { fetchDataWorkshiftFail, fetchDataWorkshiftSuccess } from './src/store/Slice/workshiftSlice'
import {fetchDataWorkerFail, fetchDataWorkerSuccess} from './src/store/Slice/workerSlice'
import {fetchDataHistoryFail, fetchDataHistorySuccess} from './src/store/Slice/historyPickerSlice'
import {fetchDataQrcodeFail, fetchDataQrcodeSuccess} from './src/store/Slice/qrcodesSlice'
import {fetchDataRegisterFail, fetchDataRegisterSuccess} from './src/store/Slice/registerSlice'
import { useDispatch } from 'react-redux'
import * as Api from './src/api/apiCustomer'
const FetchData = () => {
    const dispatch = useDispatch();
    const fetchData = async () => {
        try {
            const dataWorkshift = await Api.get('workshifts');
            dispatch(fetchDataWorkshiftSuccess(dataWorkshift));
            const dataWorker = await Api.get('workers');
            dispatch(fetchDataWorkerSuccess(dataWorker));
            const dataHistory = await Api.get('historypickers');
            dispatch(fetchDataHistorySuccess(dataHistory));
            const dataQRCode = await Api.get('qrcodes');
            dispatch(fetchDataQrcodeSuccess(dataQRCode));
            const dataRegister = await Api.get('registers');
            dispatch(fetchDataRegisterSuccess(dataRegister));
        } catch (error) {
            dispatch(fetchDataWorkshiftFail(error.message));
            dispatch(fetchDataWorkerFail(error.message));
            dispatch(fetchDataHistoryFail(error.message));
            dispatch(fetchDataQrcodeFail(error.message));
            dispatch(fetchDataRegisterFail(error.message))
        }
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData(); 
        }, 1000); 

        return () => {
            clearInterval(intervalId);
        };
    }, []);
}

export default FetchData