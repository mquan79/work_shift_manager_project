import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from '../../styles';
import { useSelector } from 'react-redux'
import * as api from '../api/apiCustomer'
import {Confirm} from '../components/Comfirm'
const WorkShiftInfoScreen = ({ route, navigation }) => {
    const workshifts = useSelector((state) => state.workshift.workshift);
    const { id } = route.params;
    const workshift = workshifts.find((item) => item._id == id);
    const user = useSelector((state) => state.auth.user);
    const [picker, setPicker] = useState({
        "id_workshift": '',
        "id_worker": '',
        "history_in_time": '',
        "history_out_time": '',
    });

    useEffect(() => {
        setPicker({ ...picker, id_worker: user._id, id_workshift: id})
    }, [user._id]);

    const confirmPicker = async() => {
        const confirmed = await Confirm('Bạn có chắc chắn thông tin của bạn đúng?');
        if(confirmed) {
            pickerWorkshift();
        }
    }

    const pickerWorkshift = async() => {
        try{
            await api.add(picker, 'historypickers');
            await api.updated(id, {'currentNumberWorker': workshift.currentNumberWorker + 1,}, 'workshifts');
            alert('Đăng ký thành công');
            navigation.navigate('WorkShift')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={styles.container}>
            <Text>{workshift._id}</Text>
            <Text>{workshift.work}</Text>
            <Text>{workshift.time}</Text>
            <Text>{workshift.date}</Text>
            <Text>{workshift.salary}</Text>
            <Button title="Đăng ký" onPress={() => confirmPicker()} />
        </View>
    );
}


export default WorkShiftInfoScreen