import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import colors from '../config/colors';
import textFont from '../config/textFont';
import smartPlugsApi from '../api/smartPlugs';
import LoadingIndicator from '../components/generalComponents/LoadingIndicator';

function SmartPlugSettings({ navigation, route }) {
  const { smartPlugId, currentLabel } = route.params;
  const [label, setLabel] = useState(currentLabel || '');
  const [originalLabel, setOriginalLabel] = useState(currentLabel || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLabel(currentLabel || '');
    setOriginalLabel(currentLabel || '');
  }, [currentLabel]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await smartPlugsApi.updateSmartPlug({ plugID: smartPlugId, deviceName: label });
      if (response.data) {
        Alert.alert('Success', 'Smart Plug name updated!', [{ text: 'OK', onPress: () => setOriginalLabel(label) }]);
      } else {
        Alert.alert('Error', response.data?.message || 'Failed to update smart plug.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update smart plug.');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Smart Plug',
      'Are you sure you want to delete this smart plug?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const response = await smartPlugsApi.deleteSmartPlug({ plugID: smartPlugId });
              if (response.data && response.data.success) {
                Alert.alert('Deleted', 'Smart Plug deleted.', [{ 
                  text: 'OK'
                }]);
              } else {
                Alert.alert('Error', response.data?.message || 'Failed to delete smart plug.');
              }
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete smart plug.');
            }
            setLoading(false);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoadingIndicator visible={loading} />
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Smart Plug Name</Text>
        <TextInput
          style={styles.input}
          value={label}
          onChangeText={setLabel}
          placeholder="Enter smart plug name"
          placeholderTextColor={colors.gray}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.button, 
              label !== originalLabel ? styles.saveButtonModified : styles.saveButton
            ]} 
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete Smart Plug</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D9F8FF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 10,
    paddingBottom: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderBottomColor: '#B5E3F7',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginBottom: 10,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.black,
  },
  headerTitle: {
    flex: 1,
    ...textFont.font,
    fontSize: 26,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginRight: 40,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#D9F8FF',
    borderTopWidth: 0,
    alignItems: 'center',
    paddingTop: 30,
  },
  label: {
    ...textFont.font,
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 10,
  },
  input: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonContainer: {
    width: '85%',
    marginTop: 20,
    gap: 15,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: colors.grey,
  },
  saveButtonModified: {
    backgroundColor: colors.darkGreen,
  },
  deleteButton: {
    backgroundColor: colors.red,
  },
  buttonText: {
    ...textFont.font,
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SmartPlugSettings; 