import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { CameraView } from 'expo-camera';
import colors from '../../config/colors';
import textFont from '../../config/textFont';

function QRScanner({ visible, onClose, onScan }) {



  const handleBarCodeScanned = ({ type, data }) => {

    onScan(data);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        >
          <View style={styles.overlay}>
            <View style={styles.scanArea} />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',

  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 50,
    width: 150,
    alignItems: 'center',
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: colors.gray,
  },
  scanAgainButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    ...textFont.text,
    color: colors.white,
    fontWeight: '600',
  },
  text: {
    ...textFont.text,
    color: colors.title,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
});

export default QRScanner; 