import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import colors from '../../config/colors';
import textFont from '../../config/textFont';

function NewSPComponent({ roomId, visible, onClose, onSave, scannedData }) {
  const [deviceName, setDeviceName] = useState('');

  const handleSave = () => {
    if (deviceName.trim()) {
      onSave({
        deviceName: deviceName.trim(),
        roomId: roomId,
        scannedID: scannedData
      });
      setDeviceName('');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Add New Smart Plug</Text>
          
          <Text style={styles.label}>Device Name:</Text>
          <TextInput
            style={styles.input}
            value={deviceName}
            onChangeText={setDeviceName}
            placeholder="Enter device name"
            placeholderTextColor={colors.gray}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    width: '85%',
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    ...textFont.font,
    fontSize: 20,
    fontWeight: '700',
    color: colors.title,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    ...textFont.font,
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.red,
  },
  saveButton: {
    backgroundColor: colors.ligthGreen,
  },
  buttonText: {
    ...textFont.font,
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NewSPComponent;
