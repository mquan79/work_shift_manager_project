import { View, Text, Button } from 'react-native'
import React from 'react'
import { logout } from '../store/Slice/authSlice'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../styles';
import * as time from '../components/time'
const SettingsScreen = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const user = useSelector((state) => state.auth.user);
  const workshifts = useSelector((state) => state.workshift.workshift)
  const historys = useSelector((state) => state.history.history)
  const qrcodes = useSelector((state) => state.qrcode.qrcode)
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
  return (
    <View style={styles.container}>
      <View>
        <Text>Tên: {user.name}</Text>
        <Text>Ngày sinh: {user.birthday}</Text>
        <Text>Căn cước công dân: {user.id_card}</Text>
        <Text>Số ca đã đăng ký: {historyUser.length}</Text>
        <Text>Số ca đã hoàn thành: {historySuccess.length}</Text>
        <Text>Số ca không hoàn thành: {miss}</Text>
        <Text>Số ca đã đi trễ: {late}</Text>
        <Text>Tổng số phút đi trễ: {minutesLate}</Text>
        <Text>Tổng số tiền lương: {salary}</Text>
      </View>
      <Button title="Đăng Xuất" onPress={handleLogout} />
    </View>
  )
}

export default SettingsScreen