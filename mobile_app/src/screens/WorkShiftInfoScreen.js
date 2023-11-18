import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as api from '../api/apiCustomer'
import { Confirm } from '../components/Comfirm'
import Icon from 'react-native-vector-icons/FontAwesome';
const WorkShiftInfoScreen = ({ route, navigation }) => {
    const workshifts = useSelector((state) => state.workshift.workshift);
    const histories = useSelector((state) => state.history.history);
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
        setPicker({ ...picker, id_worker: user._id, id_workshift: id })
    }, [user._id]);

    const history = histories.find((item) => item.id_workshift === picker.id_workshift)
    const confirmPicker = async () => {
        const confirmed = await Confirm('Bạn có chắc chắn đăng ký ca này không?');
        if (confirmed) {
            if (history) {
                alert('Bạn đã đăng ký ca này rồi')
            } else {
                pickerWorkshift();
            }

        }
    }

    const pickerWorkshift = async () => {
        try {
            await api.add(picker, 'historypickers');
            await api.updated(id, { 'currentNumberWorker': workshift.currentNumberWorker + 1, }, 'workshifts');
            alert('Đăng ký thành công');
            navigation.navigate('WorkShift')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.InfoBox}>
                <Text style={styles.title}>Thông tin</Text>
                <Text style={styles.text}>Công việc: {workshift.work}</Text>
                <Text style={styles.text}>Giờ làm: {workshift.time}</Text>
                <Text style={styles.text}>Ngày làm: {workshift.date}</Text>
                <Text style={styles.text}>Ứng tuyển: {workshift.currentNumberWorker}/{workshift.maxNumberWorker}</Text>
            </View>
            <View style={styles.InfoBox}>
                <Text style={styles.title}>Tiền lương</Text>
            <View style={styles.money}>
            <Icon name="money" style={styles.iconMoney}/>
                <Text style={styles.text}>{workshift.salary}</Text>
            </View>
            </View>
            <View style={styles.InfoBox}>
                <Text style={styles.title}>Mô tả</Text>
                <Text style={styles.text}>   1. Đối với cấu hình giờ check in:                </Text>
                <Text style={styles.text}>   Vào sớm hơn giờ vào ca: tính đúng bằng giờ vào của ca.                </Text>
                <Text style={styles.text}>    Vào trễ từ 1-15p trừ đi 30 phút tiền lương                </Text>
                <Text style={styles.text}>   Vào trễ sau 15p: không được chấm công                </Text>
                <Text style={styles.text}>   2. Đối với cấu hình giờ check out:                </Text>
                <Text style={styles.text}>    Chấm ra trễ 1-30p không cộng giờ công: giờ ra tính lương đúng bằng giờ kết thúc ca.                </Text>
                <Text style={styles.text}>   Giờ check out từ phút 31 trở đi: Làm thêm từ 1-15p cộng 15p giờ công.                 </Text>
                <Text style={styles.text}>   - Đi làm mang theo CMND/CCCD để bảo vệ kiểm tra                 </Text>
                <Text style={styles.text}>   - Quần dài, áo thun hoặc sơ mi, giày bata.                </Text>
                <Text style={styles.text}>   - Tới trước 15p so với ca làm việc để điểm danh.                </Text>
                <Text style={styles.text}>   - Ví dụ: ca (24h - 6h) và ca (1h - 7h) ngày 02/01/2023 sẽ rơi vào rạng sáng ngày 01/01/2023.                </Text>
                <Text style={styles.text}>   - Mỗi ca sẽ được nghỉ giải lao tùy sắp xếp của quản lý và thời gian nghĩ sẽ ko tính lương.                </Text>
            </View>
            <View style={styles.Register}>
                    <TouchableOpacity style={styles.buttonWorkshift} onPress={() => confirmPicker()}><Text>Đăng ký</Text></TouchableOpacity>
                </View>
        </View>
    );
}
//#001489
//#fbb700
const styles = StyleSheet.create({

    container: {
        paddingVertical: 50,
        flex: 1
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        margin: 8
    },

    text: {
        fontSize: 14
    },

    InfoBox: {
        marginVertical: 12,
        padding: 15,
        backgroundColor: 'white'
    },

    buttonWorkshift: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 20,
        backgroundColor: '#fbb700',
    },

    Register: {
        marginVertical: 12,
        padding: 15,
        justifyContent: 'flex-end'
    },

    money: {
        flexDirection: 'row',
        paddingVertical: 10,
      },
    
      iconMoney: {
        fontSize: 16,
        marginRight: 10,
      },  
});

export default WorkShiftInfoScreen