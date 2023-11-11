import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, Alert, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import ProvideSelect from '../components/provideSelect';
import DistrictSelect from '../components/districtsSelect';
import WardSelect from '../components/wardSelect';
import styles from '../../styles';
import * as time from '../components/time'
import * as api from '../api/apiCustomer'
import { Confirm } from '../components/Comfirm'
const Register = ({ navigation }) => {
    const [register, setRegister] = useState({
        "name": '',
        "birthday": '',
        "phone": '',
        "address": '',
        "id_card": '',
    });

    const [address, setAddress] = useState('');

    const [date, setDate] = useState(new Date());
    const [selectedProvinceId, setSelectedProvinceId] = useState('');
    const [selectedProvinceName, setSelectedProvinceName] = useState('');
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [selectedDistrictName, setSelectedDistrictName] = useState('');
    const [selectedWardId, setSelectedWardId] = useState('');
    const [selectedWardName, setSelectedWardName] = useState('');
    const [isProvincePickerVisible, setIsProvincePickerVisible] = useState(false);
    const [isDistrictPickerVisible, setIsDistrictPickerVisible] = useState(false);
    const [isWardPickerVisible, setIsWardPickerVisible] = useState(false);
    const provinces = useSelector(state => state.province.province);
    const districts = useSelector(state => state.districts.districts);
    const ward = useSelector(state => state.ward.ward);

    const handleProvinceChange = (provinceId) => {
        setSelectedProvinceId(provinceId);
        setIsProvincePickerVisible(false);
        setSelectedDistrictId('');
        setSelectedDistrictName('');
    };

    const handleDistrictChange = (districtId, districtName) => {
        setSelectedDistrictId(districtId);
        setSelectedDistrictName(districtName);
        setIsDistrictPickerVisible(false);
        setSelectedWardId('');
        setSelectedWardName('');
    };

    const handleWardChange = (wardId, wardName) => {
        setSelectedWardId(wardId);
        setSelectedWardName(wardName);
        setIsWardPickerVisible(false);
    };


    const handleInput = (value, name) => {
        setRegister({ ...register, [name]: value });
    };


    useEffect(() => {
        const selectedProvince = provinces.find((pro) => pro.code === selectedProvinceId);
        const selectedProvinceName = selectedProvince ? selectedProvince.name : '';
        setSelectedProvinceName(selectedProvinceName);


        const selectedDistrict = districts.find((dis) => dis.code === selectedDistrictId);
        const selectedDistrictName = selectedDistrict ? selectedDistrict.name : '';
        setSelectedDistrictName(selectedDistrictName);

        const selectedWard = ward.find((war) => war.code === selectedWardId);
        const selectedWardName = selectedWard ? selectedWard.name : '';
        setSelectedWardName(selectedWardName);
        const fullAddress = `${address}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`;
        setRegister({ ...register, address: fullAddress });
    }, [selectedProvinceId, provinces, selectedDistrictId, districts, selectedWardId, ward]);

    const renderPicker = (pickerType, pickerVisible, pickerData, pickerChangeHandler, selectedValue, placeholder) => (
        <TouchableWithoutFeedback onPress={() => openModal(pickerType)}>
            <View style={styles.input}>
                <Text style={styles.inputText}>{selectedValue ? selectedValue : placeholder}</Text>
            </View>
        </TouchableWithoutFeedback>
    );

    const closeModal = (pickerType) => {
        if (pickerType === 'province') {
            setIsProvincePickerVisible(false);
        } else if (pickerType === 'district') {
            setIsDistrictPickerVisible(false);
        } else if (pickerType === 'ward') {
            setIsWardPickerVisible(false);
        }
    };

    const openModal = (pickerType) => {
        if (pickerType === 'province') {
            setIsProvincePickerVisible(true);
        } else if (pickerType === 'district') {
            setIsDistrictPickerVisible(true);
        } else if (pickerType === 'ward') {
            setIsWardPickerVisible(true);
        }
    };

    const handleRemoveBox = async () => {
        try {
          const confirmed = await Confirm('Bạn có chắc chắn thông tin của bạn đúng?');
          if (confirmed) {
            handleRegister();
          } else {
          }
        } catch (error) {
          console.error(error);
        }
      };
      

    const handleRegister = async () => {
        if (!register.name || !register.birthday || !register.id_card || !register.phone || !register.address || !selectedWardName || !selectedDistrictName || !selectedProvinceName) {
            Alert.alert('Thông báo', 'Hãy điền đầy đủ thông tin để đăng ký.');
        } else {
            try {
                await api.add(register, 'registers');
                alert('Đăng ký thành công')
                navigation.navigate('Đăng nhập');
            } catch (e) {
                console.log(e)
            }

        }
    };

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate)
            setRegister({ ...register, birthday: time.GetDay(selectedDate) });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={(value) => handleInput(value, 'name')}
                    value={register.name}
                />
                <Text>Chọn ngày tháng năm sinh</Text>
                <DateTimePicker
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                    style={styles.datetimePicker}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='phone-pad'
                    placeholder="ID card"
                    onChangeText={(value) => handleInput(value, 'id_card')}
                    value={register.id_card}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='phone-pad'
                    placeholder="Phone"
                    onChangeText={(value) => handleInput(value, 'phone')}
                    value={register.phone}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    onChangeText={(value) => setAddress(value)}
                    value={address}
                />



                {renderPicker('province', isProvincePickerVisible, provinces, handleProvinceChange, selectedProvinceName, 'Chọn Tỉnh/Thành phố')}
                <Modal visible={isProvincePickerVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <ProvideSelect onProvinceChange={handleProvinceChange} />
                        <TouchableOpacity style={styles.closeModal} onPress={() => closeModal('province')}>
                            <Text>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {renderPicker('district', isDistrictPickerVisible, districts, handleDistrictChange, selectedDistrictName, 'Chọn Quận/Huyện')}
                <Modal visible={isDistrictPickerVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <DistrictSelect onDistrictChange={handleDistrictChange} idPro={selectedProvinceId} />
                        <TouchableOpacity style={styles.closeModal} onPress={() => closeModal('district')}>
                            <Text>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>

                {renderPicker('ward', isWardPickerVisible, ward, handleWardChange, selectedWardName, 'Chọn Xã/Phường')}
                <Modal visible={isWardPickerVisible} transparent animationType="slide">
                    <View style={styles.modalContainer}>
                        <WardSelect onDistrictChange={handleWardChange} idDis={selectedDistrictId} />
                        <TouchableOpacity style={styles.closeModal} onPress={() => closeModal('ward')}>
                            <Text>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Button title='Đăng ký' onPress={handleRemoveBox} />
                <Button title='Đăng nhập' onPress={() => navigation.navigate('Đăng nhập')} />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Register;
