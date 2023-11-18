import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataWardFail, fetchDataWardSuccess } from '../store/Slice/wardSlice';

const wardSelect = ({ onDistrictChange, idDis }) => {
  const [selectedward, setSelectedward] = useState('');
  const [previousSelectedward, setPreviousSelectedward] = useState('');
  const ward = useSelector(state => state.ward.ward);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchward = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/w/');
        dispatch(fetchDataWardSuccess(response.data));
      } catch (error) {
        dispatch(fetchDataWardFail(error));
      }
    };

    fetchward();
  }, [dispatch]);

  const handlewardChange = (itemValue) => {
    setSelectedward(itemValue);
  };

  const handlePickerClose = () => {
    if (!selectedward) {
      setSelectedward(previousSelectedward);
    } else {
      setPreviousSelectedward(selectedward);
      onDistrictChange(selectedward);
    }
  };

  const filteredward = ward.filter(district => district.district_code === idDis);
  
  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity style={styles.textPicker}onPress={handlePickerClose}><Text>Xong</Text></TouchableOpacity>
      <Picker
        style={styles.picker}
        selectedValue={selectedward}
        onValueChange={handlewardChange}
      >
        <Picker.Item label="Chọn xã/phường" value="" />
        {filteredward.map(district => (
          <Picker.Item key={district.code} label={district.name} value={district.code} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },

  picker: {
    flex: 1,
  },

  textPicker: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 20,
  }
});

export default wardSelect;
