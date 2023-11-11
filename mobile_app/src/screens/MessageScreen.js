import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList, Text, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import * as api from '../api/apiCustomer';

const MessageScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const users = useSelector((state) => state.worker.worker);
  const userCurrent = useSelector((state) => state.auth.user);

  const fetchData = async () => {
    try {
      const res = await api.get('messages');
      setMessages(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const getNameById = (id) => {
    try {
      const user = users.find((item) => item._id === id);
      return user ? user.name : 'Unknown User';
    } catch (e) {
      console.log(e);
      return 'Unknown User';
    }
  };

  const handleSendMessage = async () => {
    try {
      const dataMessage = {
        id_worker: userCurrent._id,
        message: message,
      };
      await api.add(dataMessage, 'messages');
      setMessage('');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            { alignSelf: item.id_worker === userCurrent._id ? 'flex-end' : 'flex-start' },
            { backgroundColor: item.id_worker === userCurrent._id ? 'grey' : 'white' }
          ]}>
            <Text style={styles.messageUser}>{getNameById(item.id_worker)}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textField}
          placeholder="Message.."
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <TouchableOpacity style={styles.buttonSend} onPress={handleSendMessage}>
          <Icon name="paper-plane" size={30} color={'grey'}/>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  textField: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  buttonSend: {
    marginLeft: 8,
  },
  messageContainer: {
    margin: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20
  },
  messageText: {
    fontSize: 16,
  },

  messageUser: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default MessageScreen;
