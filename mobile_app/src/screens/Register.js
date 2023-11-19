import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Modal, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import ProvideSelect from '../components/provideSelect';
import DistrictSelect from '../components/districtsSelect';
import WardSelect from '../components/wardSelect';
import * as time from '../components/time';
import * as api from '../api/apiCustomer';
import * as check from '../components/check'
import { Confirm } from '../components/Comfirm';
import Icon from 'react-native-vector-icons/FontAwesome';
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

    const workers = useSelector((state) => state.worker.worker);
    const registers = useSelector((state) => state.register.register)
    const handleRegister = async () => {
        const error = check.checkRegister(register, workers, registers)
        if (!register.name || !register.birthday || !register.id_card || !register.phone || !register.address || !selectedWardName || !selectedDistrictName || !selectedProvinceName) {
            Alert.alert('Thông báo', 'Hãy điền đầy đủ thông tin để đăng ký.');
        } else if(!check.checkNumberPhone(register.phone)){
            Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
        } else if (error) {
            Alert.alert('Thông báo', error);
            return;
        } else {
            try {
                await api.add(register, 'registers');
                Alert.alert('Thông báo','Đăng ký thành công')
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
            <View style={styles.RegisterContainer}>
                <Text style={styles.loginTitle} >REGISTER</Text>
                <View style={styles.inputContainer}>
                    <Icon name="user" size={30} color={'#001489'} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        onChangeText={(value) => handleInput(value, 'name')}
                        value={register.name}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="calendar" size={30} color={'#001489'} style={styles.icon} />
                    <DateTimePicker
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                        style={styles.datetimePicker}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="id-card" size={30} color={'#001489'} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        keyboardType='phone-pad'
                        placeholder="ID card"
                        onChangeText={(value) => handleInput(value, 'id_card')}
                        value={register.id_card}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="phone" size={30} color={'#001489'} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        keyboardType='phone-pad'
                        placeholder="Phone"
                        onChangeText={(value) => handleInput(value, 'phone')}
                        value={register.phone}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Icon name="map" size={30} color={'#001489'} style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        onChangeText={(value) => setAddress(value)}
                        value={address}
                    />
                </View>

                <View style={styles.inputAddressContainer}>
                    {renderPicker('province', isProvincePickerVisible, provinces, handleProvinceChange, selectedProvinceName, 'Chọn Tỉnh/Thành phố')}
                    <Modal visible={isProvincePickerVisible} transparent animationType="slide">
                        <View style={styles.modalContainer}>
                            <ProvideSelect onProvinceChange={handleProvinceChange} />
                            <TouchableOpacity style={styles.closeModal} onPress={() => closeModal('province')}>
                                <Text>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                <View style={styles.inputAddressContainer}>
                    {renderPicker('district', isDistrictPickerVisible, districts, handleDistrictChange, selectedDistrictName, 'Chọn Quận/Huyện')}
                    <Modal visible={isDistrictPickerVisible} transparent animationType="slide">
                        <View style={styles.modalContainer}>
                            <DistrictSelect onDistrictChange={handleDistrictChange} idPro={selectedProvinceId} />
                            <TouchableOpacity style={styles.closeModal} onPress={() => closeModal('district')}>
                                <Text>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                <View style={styles.inputAddressContainer}>
                    {renderPicker('ward', isWardPickerVisible, ward, handleWardChange, selectedWardName, 'Chọn Xã/Phường')}
                    <Modal visible={isWardPickerVisible} transparent animationType="slide">
                        <View style={styles.modalContainer}>
                            <WardSelect onDistrictChange={handleWardChange} idDis={selectedDistrictId} />
                            <TouchableOpacity style={styles.closeModal} onPress={() => closeModal('ward')}>
                                <Text>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                <TouchableOpacity style={styles.buttonRegister} onPress={handleRemoveBox}><Text style={styles.textButtonRebuttonRegister}>Đăng ký</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('Đăng nhập')}><Text style={styles.textButtonLogin}>Đăng nhập</Text></TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};
//#001489
//#fbb700
const styles = StyleSheet.create({

    RegisterContainer: {
        paddingVertical: 50,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#001489',
    },

    loginTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 20,
        color: 'white'
    },

    iconTitle: {
        fontSize: 100,
        margin: 40,
        color: '#fbb700',
        borderWidth: 5,
        borderColor: '#fbb700',
        borderRadius: 100,
        padding: 45,
    },

    input: {
        width: '60%',
        height: 20,
        marginVertical: 10,
        justifyContent: 'center',
        marginLeft: 10,
        color: '#001489',
    },

    inputContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 5,
        backgroundColor: 'white'
    },

    buttonLogin: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        width: '70%',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: 'white',
    },

    textButtonLogin: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#001489'
    },

    buttonRegister: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        width: '70%',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5,
        backgroundColor: '#fbb700',
        borderWidth: 2,
        borderColor: 'white',
    },

    textButtonRegister: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black'
    },

    pickerContainer: {
        width: '100%',
        height: '30%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },

    picker: {
        flex: 1,
    },

    icon: {
        width: 40
    },

    datetimePicker: {
        width: '60%',
    },

    inputAddressContainer: {
        width: '75%',
        marginVertical: 10,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: 'white'
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

    inputText: {
        flex: 1,
        textAlignVertical: 'center',
    },

    closeModal: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 30,
    },

    textPicker: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 20,
    },

});

export default Register;
