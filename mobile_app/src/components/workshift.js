import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import * as time from './time';
import Icon from 'react-native-vector-icons/FontAwesome';
const Workshift = ({ id, historyIn, historyOut }) => {
  const workshifts = useSelector((state) => state.workshift.workshift);
  const workshift = workshifts.find((item) => item._id === id);
  const lastDay = time.getLastDay();
  const isMiss = (new Date(lastDay) >= new Date(workshift.date) && (historyIn == '' || historyOut == ''));
  const isNoMiss = (historyIn != '' && historyOut != '')
  const dateIn = new Date(historyIn);
  const hours = dateIn.getHours();
  const hourQRcodeIn = time.getHoursIn(workshift.time);
  const isLate = hours >= hourQRcodeIn;
  const minuLate = time.compareTimeStringAndHour(historyIn, hourQRcodeIn);
  return (
    <View>
      <Text style={styles.text}>{workshift.work}, {workshift.date}, {workshift.time}</Text>
      <View style={styles.money}>
        <Icon name="money" style={styles.iconMoney} />
        <Text style={styles.textMoney} >{parseInt(workshift.salary).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}/h</Text>
      </View>
      <View style={styles.time}>
        <Icon name="clock-o" style={styles.timeIcon} />
        {historyIn ? (<Text style={styles.status}>{time.formatDateString(historyIn)} -</Text>) : (<Text style={styles.status}>Chưa quét ca -</Text>)}
        {historyOut ? (<Text style={styles.status}> {time.formatDateString(historyOut)}</Text>) : (<Text style={styles.status}> Chưa quét ca</Text>)}
      </View>
      {isLate ?
        (<Text style={[styles.status, { color: 'red', marginLeft: '70%' }]}>Trễ {minuLate} phút</Text>) :
        (isMiss ? (<Text style={[styles.status, { color: 'red', marginLeft: '70%' }]}>Không quét</Text>) :
          (isNoMiss ? (<Text style={[styles.status, { color: 'green', marginLeft: '70%' }]}>Đã quét ca</Text>) :
            (<Text style={[styles.status, { marginLeft: '70%' }]}>Chưa quét ca</Text>)))}
    </View>
  );
};
//#001489
//#fbb700
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  time: {
    flexDirection: 'row',
    paddingVertical: 10,
  },

  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  money: {
    flexDirection: 'row',
    paddingVertical: 10,
  },

  iconMoney: {
    fontSize: 16,
    marginRight: 10,
    color: '#fbb700'
  },

  timeIcon: {
    fontSize: 16,
    marginRight: 10,
  },

  textMoney: {
    color: '#fbb700',
    fontWeight: 'bold'
  }
});

export default Workshift;
