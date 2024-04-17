import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Modal,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import LearningFocusList from "../components/LearningFocusList.jsx";
import { PracticeModalContext } from "../context/PracticeModalContext.jsx";
import Timer from "../components/timer.jsx";
import MessageSnackbar from "../components/MessageSnackbar.jsx";
import {
  finishPractice,
  getPracticeNotes,
  postPracticeNote,
} from "../utils/api.js";

const AddPracticeModal = ({ visible, onClose }) => {
  const {
    notes,
    newNote,
    setNewNote,
    newPractice,
    setNewPractice,
    setPracticeModalIsVisible,
  } = useContext(PracticeModalContext);
  const [learningFocus, setLearningFocus] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [newPracticeNotes, setNewPracticeNotes] = useState([]);
  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const { practice_id } = newPractice;

  useEffect(() => {
    if (visible) {
      StatusBar.setBackgroundColor("pink");
    } else {
      StatusBar.setBackgroundColor("#F3E38B");
    }
  }, [visible]);

  useEffect(() => {
    const fetchPracticeNotes = async () => {
      try {
        result = await getPracticeNotes(practice_id);
        setNewPracticeNotes(result);
      } catch (error) {
        console.log(error);
      }
    };
    if (newNote.practice_id) {
      // only fetches notes after one added
      fetchPracticeNotes();
    }
  }, [newNote]);

  const handleListPress = (item) => {
    setLearningFocus(item);
  };

  const completePractice = async () => {
    const startTime = new Date(newPractice.practice_timestamp);
    const endTime = new Date();
    const duration = Math.ceil((endTime - startTime) / 60000); // converts to minutes
    try {
      const result = await finishPractice(practice_id, duration);
      setMessage("Practice complete");
      setPracticeModalIsVisible(false);
      setNewPractice({});
      setNewNote([]);
    } catch (error) {
      setMessage("Problem adding adding practice. Please try again soon.");
      setMessageVisible(true);
    }
  };

  const handleAddNote = async () => {
    if (!learningFocus || !noteContent) {
      setMessage("Both values are required.");
      setMessageVisible(true);
      return;
    }
    try {
      const result = await postPracticeNote(
        practice_id,
        learningFocus,
        noteContent
      );
      setIsSubmittingNote(true);
      setNewNote(result);
      setLearningFocus("");
      setNoteContent("");
    } catch (error) {
      console.log(error);
      setMessage("Problem adding note. Please try again soon.");
      setMessageVisible(true);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => onClose(practice_id)}
    >
      <SafeAreaView
        style={[
          styles.modalContainer,
          Platform.OS === "web" ? { alignSelf: "center" } : null,
        ]}
      >
        <View style={styles.modalContent}>
          <Text variant="titleMedium">Recent Work</Text>
          <LearningFocusList allNotes={notes} handlePress={handleListPress} />

          <View
            style={{
              padding: 12,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: "lightgray",
              marginVertical: 4,
            }}
          >
            <TextInput
              label="Learning Focus"
              value={learningFocus}
              cursorColor="black"
              multiline={true}
              onChangeText={(text) => setLearningFocus(text)}
              contentStyle={{ backgroundColor: "white" }}
              style={{ backgroundColor: "#FFF" }} // needed for web
            />
            <TextInput
              label="Notes"
              value={noteContent}
              cursorColor="black"
              multiline={true}
              onChangeText={(text) => setNoteContent(text)}
              contentStyle={{ backgroundColor: "white" }}
              style={{ marginBottom: 16, backgroundColor: "#FFF" }}
            />
            <Button
              mode="contained"
              disabled={isSubmittingNote}
              buttonColor="#B9D9EB"
              textColor="black"
              onPress={() => handleAddNote()}
            >
              Add note
            </Button>
          </View>
          <ScrollView>
            {newPracticeNotes.map((note, index) => (
              <View
                style={{ borderBottomWidth: 0.5, paddingVertical: 8 }}
                key={index}
              >
                <Text style={{ fontWeight: "900" }}>{note.learning_focus}</Text>
                <Text>{note.note_content}</Text>
              </View>
            ))}
          </ScrollView>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Timer isVisible={visible} />
            <View style={styles.submitButtons}>
              <Button
                mode="outlined"
                buttonColor="#6CC1F1"
                labelStyle={{ fontSize: 12 }}
                onPress={() => onClose(practice_id)}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                buttonColor="#6CC1F1"
                contentStyle={{ width: 90 }}
                labelStyle={{ fontSize: 12 }}
                onPress={() => completePractice()}
              >
                Done
              </Button>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <MessageSnackbar
        messageVisible={messageVisible}
        setMessageVisible={setMessageVisible}
        message={message}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    maxWidth: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  modalContent: {
    flex: 1,
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    marginTop: Platform.OS === "web" ? 20 : 0,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
  },
  submitButtons: {
    flexDirection: "row",
    paddingVertical: 0,
    justifyContent: "space-evenly",
  },
});

export default AddPracticeModal;
