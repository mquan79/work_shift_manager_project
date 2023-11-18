import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataDistrictsFail, fetchDataDistrictsSuccess } from '../store/Slice/districtsSlice';

const DistrictSelect = ({ onDistrictChange, idPro }) => {
  const [selectedDistricts, setSelectedDistricts] = useState('');
  const [previousSelectedDistricts, setPreviousSelectedDistricts] = useState('');
  const districts = useSelector(state => state.districts.districts);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('https://provinces.open-api.vn/api/d/');
        dispatch(fetchDataDistrictsSuccess(response.data));
      } catch (error) {
        dispatch(fetchDataDistrictsFail(error));
      }
    };

    fetchDistricts();
  }, [dispatch]);

  const handleDistrictsChange = (itemValue) => {
    setSelectedDistricts(itemValue);
  };

  const handlePickerClose = () => {
    if (!selectedDistricts) {
      setSelectedDistricts(previousSelectedDistricts);
    } else {
      setPreviousSelectedDistricts(selectedDistricts);
      onDistrictChange(selectedDistricts);
    }
  };

  const filteredDistricts = districts.filter(district => district.province_code === idPro);
  
  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity style={styles.textPicker}onPress={handlePickerClose}><Text>Xong</Text></TouchableOpacity>
      <Picker
        style={styles.picker}
        selectedValue={selectedDistricts}
        onValueChange={handleDistrictsChange}
      >
        <Picker.Item label="Chọn quận/huyện" value="" />
        {filteredDistricts.map(district => (
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

export default DistrictSelect;
