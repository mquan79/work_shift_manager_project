import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as api from '../api/apiCustomer';
import { BarCodeScanner } from 'expo-barcode-scanner';
const QRCodeScannerScreen = ({ navigation }) => {
  const dataQRcode = useSelector((state) => state.qrcode.qrcode);
  const histories = useSelector((state) => state.history.history);
  const user = useSelector((state) => state.auth.user);
  const [dataIn, setDataIn] = useState({
    'history_in_time': new Date(),
  });
  const [dataOut, setDataOut] = useState({
    'history_out_time': new Date(),
  })
    


  async function updateHistory(id, data) {
    try {
      await api.updated(id, data, 'historypickers');
    } catch (e) {
      console.log(e);
    }
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const currentQRCode = dataQRcode.find((item) => item.qrcode === data);
    if (currentQRCode) {
      const currentHistory = histories.find((item) => item.id_worker === user._id && item.id_workshift === currentQRCode.id_workshift)
      if (currentHistory) {
        if (currentHistory.history_in_time === '' && currentQRCode.type === 'in') {
          updateHistory(currentHistory._id, dataIn);
          alert('Quét thành công');
        } else
          if (currentHistory.history_in_time !== '' && currentQRCode.type === 'in') {
            alert('Bạn đã quét vào ca này rồi');
          } else
            if (currentHistory.history_out_time === '' && currentQRCode.type === 'out') {
              updateHistory(currentHistory._id, dataOut);
              alert('Quét thành công');
            } else
              if (currentHistory.history_in_time !== '' && currentHistory.history_out_time !== '') {
                alert('Bạn đã quét ca này rồi');
      
              }
      }
      else {
        alert('Bạn không có ca làm nào lúc này');
      }
    } else {
      alert('Mã QR sai');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRCodeScannerScreen;

