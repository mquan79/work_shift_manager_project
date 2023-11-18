import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import * as api from '../api/apiCustomer';

const MessageScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const users = useSelector((state) => state.worker.worker);
  const userCurrent = useSelector((state) => state.auth.user);
  const flatListRef = useRef(null);

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
    if (message === '') {
      return;
    }
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

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.MessageScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageContainer,
            { alignSelf: item.id_worker === userCurrent._id ? 'flex-end' : 'flex-start' },
            { backgroundColor: item.id_worker === userCurrent._id ? 'grey' : '#fbb700' }
          ]}>
            <Text style={styles.messageUser}>{getNameById(item.id_worker)}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
        onContentSizeChange={() => {
          scrollToBottom();
        }}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textField}
          placeholder="Message.."
          onChangeText={(text) => setMessage(text)}
          value={message}
        />
        <TouchableOpacity style={styles.buttonSend} onPress={handleSendMessage}>
          <Icon name="paper-plane" size={30} color={'#001489'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
//#001489
//#fbb700
const styles = StyleSheet.create({
  MessageScreenContainer: {
    marginTop: 50,
    flex: 1,
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
    borderRadius: 20,
  },
  messageText: {
    fontSize: 16,
  },

  messageUser: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  inputContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
});

export default MessageScreen;
