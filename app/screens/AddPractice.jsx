import React, { useContext, useEffect, useState } from 'react';
import { View, Modal, StyleSheet, StatusBar } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LearningFocusList } from '../components/LearningFocusList.jsx';
import { LessonModalContext } from '../context/LessonModalContext.jsx';
import { Timer } from '../components/timer.jsx';

const NewLessonNote = () => {
  const [text, setText] = useState("");

  return (
    <TextInput
      label="Learning Focus"
      value={text}
      multiline={true}
      onChangeText={text => setText(text)}
    />
  );
};

const AddLessonModal = ({ visible, onClose }) => {
  const { lessons, newLesson } = useContext(LessonModalContext)
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
            <LearningFocusList lessons={lessons} />
            {/* Content for creating and saving a new lesson */}
            <Text variant='titleMedium'>{`${newLesson.lesson_id}`}</Text>
            <NewLessonNote />
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'flex-end'}}>
              <Timer />
              <View style={styles.submitButtons}>
                <Button mode="outlined" labelStyle={{fontSize: 12}} onPress={() => onClose(newLesson.lesson_id)}>
                  Cancel
                </Button>
                <Button mode="contained" contentStyle={{width: 90}}labelStyle={{fontSize: 12}} onPress={() => console.log('Pressed')}>
                  Done
                </Button>
              </View>
            </View>
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
  submitButtons: {
    flexDirection: 'row',
    paddingVertical: 0,
    justifyContent: 'space-evenly',
  },
});

export default AddLessonModal;