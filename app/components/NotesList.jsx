import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { formatDate } from "../utils";
import NoteCard from "./NoteCard";

const NotesList = ({ notes }) => {
  let previousDate = null;

  return notes.map((note, index) => {
    const timestamp = note.practice_timestamp || note.lesson_timestamp;
    const currentDate = new Date(timestamp).toDateString();
    const showDate = currentDate !== previousDate; // Check if it needs a new date title
    previousDate = currentDate;

    return (
      <View style={styles.day} key={index}>
        {showDate ? (
          <Text variant="titleMedium" style={styles.date}>
            {formatDate(timestamp)}
          </Text>
        ) : null}
        <NoteCard
          note_content={note.note_content}
          timestamp={timestamp}
          learning_focus={note.learning_focus}
          lesson_id={note.lesson_id}
          practice_id={note.practice_id}
        />
      </View>
    );
  });
};

const styles = StyleSheet.create({
  date: {
    paddingBottom: 4,
    paddingTop: 16,
  },
});

export default NotesList;
