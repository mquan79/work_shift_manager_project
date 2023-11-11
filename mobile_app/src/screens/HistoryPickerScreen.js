import React from 'react';
import { View, ScrollView } from 'react-native';
import styles from '../../styles';
import { useSelector } from 'react-redux';
import Workshift from '../components/workshift'; 

const HistoryPickerScreen = () => {
  const histories = useSelector((state) => state.history.history);
  const user = useSelector((state) => state.auth.user);
  const filteredHistory = histories.filter((item) => item.id_worker === user._id);
  return (
    <View style={styles.workshift_container}>
      {filteredHistory ? (
      <ScrollView>
      {filteredHistory.map((workshift) => (
        <View style={styles.workshift_box} key={workshift._id}>
          <Workshift id={workshift.id_workshift} historyIn={workshift.history_in_time} historyOut={workshift.history_out_time}/>
        </View>
      ))}
    </ScrollView>
      ) : (
        <Text>Bạn chưa đăng ký ca nào</Text>
      )}

    </View>
  );
};

export default HistoryPickerScreen;
