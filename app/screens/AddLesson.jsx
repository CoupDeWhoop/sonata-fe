import React, { useEffect } from 'react';
import { View, Modal, StyleSheet, Text, Button, StatusBar, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddLessonModal = ({ visible, onClose }) => {

  useEffect(() => {
    if(visible) {
      StatusBar.setBackgroundColor('pink');
    } else {
      StatusBar.setBackgroundColor('#FAF9FA');
    }

  }, [visible]);

  return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Content for creating and saving a new lesson */}
            <Text>New Lesson</Text>
            <Button title="Close" onPress={onClose} />
          </View>
        </SafeAreaView>
      </Modal>

  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
  modalContent: {
    flex: 1,
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
  },
});

export default AddLessonModal;