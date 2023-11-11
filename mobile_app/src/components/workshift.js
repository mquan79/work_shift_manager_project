import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../../styles';
import * as time from './time'
const Workshift = ({ id, historyIn, historyOut }) => { 
  const workshifts = useSelector((state) => state.workshift.workshift);
  const workshift = workshifts.find((item) => item._id === id); 
  const lastDay = time.getLastDay();
  const isMiss = (new Date(lastDay) > new Date(workshift.date) && historyIn == '');
  const isNoMiss = (historyIn != '' && historyOut != '')
  const dateIn = new Date(historyIn);
  const hours = dateIn.getHours();
  const hourQRcodeIn = time.getHoursIn(workshift.time);
  const isLate = hours == hourQRcodeIn;
  const minuLate = time.compareTimeStringAndHour(historyIn, hourQRcodeIn);
  return (
    <View>
        <Text style={styles.text}>{workshift.work}, {workshift.date}, {workshift.time}</Text>
        {historyIn ? (<Text>{time.formatDateString(historyIn)}</Text>) : (<Text>Chưa quét ca</Text>)}
        {historyOut ? (<Text>{time.formatDateString(historyOut)}</Text>) : (<Text>Chưa quét ca</Text>)}
        {isLate ? (<Text>Trễ {minuLate} phút</Text>) : ( isMiss ? (<Text>Không quét</Text>) : (isNoMiss ? (<Text>Đã quét ca</Text>) : (<Text>Chưa quét ca</Text>)))}
    </View>
  );
};

export default Workshift;
