import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { loginRequest, loginSuccess, loginFailure } from '../store/Slice/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import styles from '../../styles';
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const workers = useSelector((state) => state.worker.worker)
  const handleLogin = () => {
    const workerFind = workers.find((wk) => wk.password === password && wk.phone === username);
    if (workerFind) {
      try {
        dispatch(loginRequest());
        dispatch(loginSuccess(workerFind));
      } catch (error) {
        dispatch(loginFailure(error.message));
        console.log(error);
      }
    } else {
      Alert.alert('Sai thông tin đăng nhập');
      console.log(workers)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
          <TextInput
            style={styles.input}
            keyboardType='phone-pad'
            placeholder="Phone"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Button title="Đăng nhập" onPress={handleLogin} />
      <Button title='Đăng ký' onPress={() => navigation.navigate('Đăng ký')} />
    </View>
  );

};

export default Login;
