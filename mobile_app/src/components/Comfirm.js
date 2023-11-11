import { Alert } from 'react-native';

export const Confirm = (message) => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      'Xác nhận',
      message,
      [
        {
          text: 'Hủy',
          onPress: () => resolve(false),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => resolve(true),
        },
      ],
      { cancelable: false }
    );
  });
};
