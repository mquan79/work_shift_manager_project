import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import WorkShiftScreen from './src/screens/WorkShiftScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import QRCodeScannerScreen from './src/screens/QRCodeScannerScreen';
import HistoryPickerScreen from './src/screens/HistoryPickerScreen';
import MessageScreen from './src/screens/MessageScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import WorkShiftInfoScreen from './src/screens/WorkShiftInfoScreen'
import FetchData from './FetchData'
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const user = useSelector((state) => state.auth.user);

  const LoginStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Đăng nhập" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Đăng ký" component={Register} options={{ headerShown: false }} />
    </Stack.Navigator>
  );

  const WorkShiftStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name='WorkShift' component={WorkShiftScreen} options={{ headerShown: false }} />
        <Stack.Screen name='WorkShiftInfo' component={WorkShiftInfoScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }


  return (
    <NavigationContainer>
      <FetchData />
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Tìm việc') {
                iconName = focused ? 'search' : 'search';
              } else if (route.name === 'Lịch làm') {
                iconName = focused ? 'calendar' : 'calendar-o';
              } else if (route.name === 'Quét mã') {
                iconName = focused ? 'qrcode' : 'qrcode';
              } else if (route.name === 'Người dùng') {
                iconName = focused ? 'user' : 'user-o';
              } else if (route.name === 'Tin nhắn') {
                iconName = focused ? 'comment' : 'comment-o';
              }


              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Tìm việc" component={WorkShiftStack} options={{ headerShown: false }} />
          <Tab.Screen name="Lịch làm" component={HistoryPickerScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Quét mã" component={QRCodeScannerScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Tin nhắn" component={MessageScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Người dùng" component={SettingsScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
      ) : (
        <LoginStack />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
