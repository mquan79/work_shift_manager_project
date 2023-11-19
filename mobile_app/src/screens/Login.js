import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { loginRequest, loginSuccess, loginFailure } from '../store/Slice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const workers = useSelector((state) => state.worker.worker);

  const handleLogin = () => {
    if(username === '' || password === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const workerFind = workers.find((wk) => wk.password === password && wk.phone === username);
    if (workerFind) {
      try {
        dispatch(loginRequest());
        dispatch(loginSuccess(workerFind));
        Alert.alert('Thông báo', 'Đăng nhập thành công');
      } catch (error) {
        dispatch(loginFailure(error.message));
        console.log(error);
      }
    } else {
      Alert.alert('Sai thông tin đăng nhập');
    }
  };

  return (
    <View style={styles.LoginContainer}>
      <Icon name="users" style={styles.iconTitle} />
      <Text style={styles.loginTitle}>LOGIN</Text>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={30} color={'#001489'} style={styles.icon} />
        <TextInput
          style={styles.input}
          keyboardType='phone-pad'
          placeholder="Phone"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={30} color={'#001489'} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true} 
        />
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={handleLogin}><Text style={styles.textButtonLogin}>Đăng nhập</Text></TouchableOpacity>
      <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('Đăng ký')}><Text style={styles.textButtonRegister}>Đăng ký</Text></TouchableOpacity>
    </View>
  );
};
//#001489
//#fbb700
const styles = StyleSheet.create({
  LoginContainer: {
    backgroundColor: '#001489',
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
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
  }
});

export default Login;
