import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import * as time from '../components/time';
import Icon from 'react-native-vector-icons/FontAwesome';
const WorkShiftScreen = ({ navigation }) => {
    const workshifts = useSelector((state) => state.workshift.workshift)
    const workshiftFiller = workshifts.filter((item) => item.date == time.getTomorrow())

    return (
        <View style={styles.workshift_container}>
            <ScrollView>
                {workshiftFiller.map((workshift) => (
                    <View style={styles.workshift_box} key={workshift._id}>
                        <Text style={styles.textWorkshift} >{workshift.work}, {workshift.date}, {workshift.time}</Text>
                        <View style={styles.money}>
                            <Icon name="money" style={styles.iconMoney}/>
                            <Text style={styles.textWorkshift} >{parseInt(workshift.salary).toLocaleString('vi-VN', {
          style: 'currency',
          currency: 'VND',
        })}/h</Text>
                        </View>
                        <TouchableOpacity style={styles.buttonWorkshift} onPress={() => navigation.navigate('WorkShiftInfo', { id: workshift._id })}><Text>Đăng ký</Text></TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
//#001489
//#fbb700
const styles = StyleSheet.create({
    workshift_container: {
        paddingTop: 70,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

    workshift_box: {
      marginVertical: 12,
      padding: 25,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 10,
      backgroundColor: 'white'
    },
  
    textWorkshift: {
      fontWeight: 'bold',
    },
  
    money: {
      flexDirection: 'row',
      paddingVertical: 10,
    },
  
    iconMoney: {
      fontSize: 16,
      marginRight: 10,
    },  
  
    buttonWorkshift: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingVertical: 10,
      backgroundColor: '#fbb700',
    },
  });

export default WorkShiftScreen