import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataProvinceFail, fetchDataProvinceSuccess } from '../store/Slice/provinceSlice';
import styles from '../../styles';

const ProvideSelect = ({ onProvinceChange }) => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [previousSelectedProvince, setPreviousSelectedProvince] = useState('');
  const provinces = useSelector(state => state.province.province);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://provinces.open-api.vn/api/')
      .then(response => {
        dispatch(fetchDataProvinceSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchDataProvinceFail(error));
      });
  }, [dispatch]);

  const handleProvinceChange = (itemValue) => {
    setSelectedProvince(itemValue);
  };

  const handlePickerClose = () => {
    if (!selectedProvince) {
      setSelectedProvince(previousSelectedProvince);
    } else {
      setPreviousSelectedProvince(selectedProvince);
      onProvinceChange(selectedProvince);
    }
  };

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity style={styles.textPicker}onPress={handlePickerClose}><Text>Xong</Text></TouchableOpacity>
      <Picker
        style={styles.picker}
        selectedValue={selectedProvince}
        onValueChange={(itemValue) => handleProvinceChange(itemValue)}
      >
        <Picker.Item label="Chọn tỉnh/thành phố" value="" />
        {provinces.map(province => (
          <Picker.Item key={province.code} label={province.name} value={province.code} />
        ))}
      </Picker>
    </View>
  );
};

export default ProvideSelect;
