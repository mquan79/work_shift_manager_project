import { StyleSheet } from 'react-native';

const inputWidth = '60%';
const borderColor = '#ccc';
const borderRadius = 5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
  },

  input: {
    width: inputWidth,
    height: 40,
    borderColor: borderColor,
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: borderRadius,
    justifyContent: 'center',
  },

  datetimePicker: {
  },


  pickerContainer: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderColor: borderColor,
    borderWidth: 1,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },

  picker: {
    flex: 1,
  
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
    margin: 20
  },

  workshift_box: {
    marginVertical: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey'
  },

  workshift_container: {
    marginTop: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default styles;
