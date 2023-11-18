import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { logout } from '../store/Slice/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import * as time from '../components/time'
import Barcode from 'react-native-barcode-builder';
const SettingsScreen = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const user = useSelector((state) => state.auth.user);
  const workshifts = useSelector((state) => state.workshift.workshift)
  const historys = useSelector((state) => state.history.history)
  const historyUser = historys.filter((item) => item.id_worker === user._id)
  const historySuccess = historyUser.filter((item) => item.history_in_time !== '' && item.history_out_time !== '');
  const lastDay = time.getLastDay();
  const historyMiss = historyUser.filter((item) => item.history_in_time === '' && item.history_out_time === '');
  let miss = 0;
  let minutesLate = 0;
  let late = 0;
  let salary = 0
  for(const i of historyMiss) {
    const workshiftUser = workshifts.find((item) => item._id === i.id_workshift);
    const date1 = new Date(workshiftUser.date)
    const date2 = new Date(lastDay);
    if(date1 < date2) {
      miss++;
    }
  }

  for(const i of historySuccess) {
    const workshiftUser = workshifts.find((item) => item._id === i.id_workshift);
    salary += workshiftUser.salary;
    const minuLate = time.compareTimeStringAndHour(i.history_in_time, time.getHoursIn(workshiftUser.time));
    const timeIn = new Date(i.history_in_time)
    if(timeIn.getHours() == time.getHoursIn(workshiftUser.time)){
      minutesLate += minuLate;
      late++;
    }
  }

  const generateBarcodeValue = (inputValue) => {
    // Loại bỏ ký tự không phải số từ chuỗi
    const numericValue = inputValue.replace(/\D/g, '');

    // Chuyển đổi chuỗi số thành mã vạch
    return numericValue;
  }

  const code = generateBarcodeValue(user._id);
  console.log(code)
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <Text style={styles.text}>Ngày sinh: {user.birthday}</Text>
        <Text style={styles.text}>Căn cước công dân: {user.id_card}</Text>
        <Text style={styles.text}>Số ca đã đăng ký: {historyUser.length}</Text>
        <Text style={styles.text}>Số ca đã hoàn thành: {historySuccess.length}</Text>
        <Text style={styles.text}>Số ca không hoàn thành: {miss}</Text>
        <Text style={styles.text}>Số ca đã đi trễ: {late}</Text>
        <Text style={styles.text}>Tổng số phút đi trễ: {minutesLate}</Text>
        <Text style={styles.text}>Tổng số tiền lương: {salary}</Text>
        <Barcode value={code} format="CODE128" />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  );
}
//#001489
//#fbb700
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center', 
    alignSelf: 'center', 
    marginBottom: 5, 
  },
  phone: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', 
    alignSelf: 'center', 
    marginBottom: 20, 
    color: '#fbb700',
  },
  userInfoContainer: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'flex-start',
    marginBottom: 20,
    padding: 20
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#fbb700', 
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});



export default SettingsScreen