import { useState, useRef, useContext } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import {
  Button,
  Card,
  Icon,
  MD2Colors,
  Modal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { formatDate, formatTime, postLessonNote } from "../utils";
import LearningFocusList from "../components/LearningFocusList";
import { AppContext } from "../context/AppProvider";

const LessonDetailsScreen = ({ lesson }) => {
  const [errorVisible, setErrorVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [learningFocus, setLearningFocus] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateLessons } = useContext(AppContext);

  const learningFocusInputRef = useRef(null);
  const notesInputRef = useRef(null);

  const handleLearningFocusPress = (item, learningTopics, index) => {
    setLearningFocus(item);
  };

  const handleSubmitNote = async () => {
    if (!learningFocus || !notes) {
      setError("Learning Focus and Notes are required");
      setErrorVisible(true);
      return;
    }

    learningFocusInputRef.current.blur();
    notesInputRef.current.blur();
    setIsSubmitting(true);

    const newNote = {
      learning_focus: learningFocus,
      note_content: notes,
    };
    try {
      const postedNote = await postLessonNote(lesson.lesson_id, newNote);
      const updatedLesson = { ...lesson }.notes.push(postedNote);
      await updateLessons();
      setLearningFocus("");
      setNotes("");
      setModalVisible(false);
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const Label = (text) => (
    <Text style={{ color: MD2Colors.grey500 }}>{text}</Text>
  );

  return (
    <View style={{ flex: 1, padding: 16, paddingBottom: 8 }}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} variant="titleMedium">{`${formatDate(
          lesson.lesson_timestamp,
          "long"
        )}`}</Text>
        <Text style={styles.title} variant="titleMedium">
          {" "}
          {`${formatTime(lesson.lesson_timestamp)}`}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{ marginTop: 16, paddingBottom: 4 }}
        data={lesson.notes}
        keyExtractor={(item) => item.note_id}
        renderItem={({ item }) => (
          <View>
            <Card style={styles.card}>
              <Card.Title title={item.learning_focus} />
              <Card.Content>
                <Text variant="bodyMedium">{item.note_content}</Text>
              </Card.Content>
            </Card>
          </View>
        )}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            lineHeight: 20,
            color: MD2Colors.grey500,
          }}
        >
          Add some notes {`\n`}from your lesson
        </Text>
        <View style={{ flex: 1, alignItems: "center", marginTop: 10 }}>
          <Icon source="fountain-pen-tip" color={MD2Colors.grey500} size={40} />
        </View>
      </View>
      <Button
        style={{ backgroundColor: "#3498db" }}
        mode={"contained"}
        onPress={() => setModalVisible(true)}
      >
        Add Note
      </Button>
      <Modal
        style={styles.modal}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        theme={{ colors: { backdrop: "rgba(0, 0, 0, 0.6)" } }}
      >
        <LearningFocusList
          allNotes={lesson.notes}
          handlePress={handleLearningFocusPress}
        />
        <TextInput
          ref={learningFocusInputRef}
          style={styles.learningFocusInput}
          mode={"outlined"}
          label={Label("Learning Focus")}
          value={learningFocus}
          onChangeText={(text) => setLearningFocus(text)}
        />
        <TextInput
          ref={notesInputRef}
          style={styles.noteInput}
          mode={"outlined"}
          multiline={true}
          placeholder="Lesson Notes"
          placeholderTextColor={MD2Colors.grey500}
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />
        <Button
          mode="contained"
          /*overrides grey on disabled*/
          style={[styles.submitButton, { backgroundColor: MD2Colors.pink200 }]}
          buttonColor={MD2Colors.pink200}
          labelStyle={{ fontSize: 14 }}
          disabled={isSubmitting}
          loading={isSubmitting}
          onPress={handleSubmitNote}
        >
          Add Note
        </Button>
      </Modal>
      <View>
        <Snackbar
          visible={errorVisible}
          onDismiss={() => setErrorVisible(false)}
          action={{
            label: "Close",
          }}
        >
          Learning Focus and Notes are required
        </Snackbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  card: {
    margin: 2,
    marginBottom: 4,
    backgroundColor: "white",
    borderWidth: 0,
    shadowColor: "transparent",
  },
  modal: {
    margin: 16,
  },
  learningFocusInput: {
    backgroundColor: "white",
    marginBottom: 8,
  },
  noteInput: {
    height: 140,
    backgroundColor: "white",
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 4,
  },
});

export default LessonDetailsScreen;
