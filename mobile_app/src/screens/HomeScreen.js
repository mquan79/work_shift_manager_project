import React from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/Slice/authSlice'; 
import styles from '../../styles';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Button title="Đăng Xuất" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
