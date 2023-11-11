import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import '../../styles'
import styles from '../../styles'
import { useSelector } from 'react-redux'
import * as time from '../components/time'
const WorkShiftScreen = ({navigation}) => {
    const workshifts = useSelector((state) => state.workshift.workshift)
    const workshiftFiller = workshifts.filter((item) => item.date == time.getTomorrow())

    return (
        <View style={styles.workshift_container}>
            <ScrollView>
            {workshiftFiller.map((workshift) => (
                <View style={styles.workshift_box} key={workshift._id}>
                    <Text style={styles.text} >{workshift._id}</Text>
                    <Text style={styles.text} >{workshift.work}, {workshift.date}, {workshift.time}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('WorkShiftInfo', {id: workshift._id})}><Text>Nhấn vào</Text></TouchableOpacity>
                </View>
            ))}
            </ScrollView>
        </View>
    )
}

export default WorkShiftScreen