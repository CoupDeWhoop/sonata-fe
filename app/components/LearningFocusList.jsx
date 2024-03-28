import react, { useState, useContext } from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import { AppContext } from "../context/AppProvider";
import { formatDate } from "../utils";

export const LearningFocusList = ({
  selectedLearningFocusList,
  selectLearningFocusList,
}) => {
  const { lessons, practises } = useContext(AppContext);

  const allData = [...lessons, ...practises];

  const organizedData = {};

  const handlePress = (focus, index) => {
    selectLearningFocusList((currentFocus) => {
      if (currentFocus && currentFocus.index === index) {
        return null; // handles reclick on same item
      }
      return { list: organizedData[focus], index };
    });
  };

  allData.forEach((item) => {
    if (item.notes) {
      item.notes.forEach((note) => {
        const timestamp = item.lesson_timestamp || item.practice_timestamp;
        if (!organizedData[note.learning_focus]) {
          organizedData[note.learning_focus] = [];
        }
        organizedData[note.learning_focus].push({
          type: item.lesson_timestamp ? "lesson" : "practice",
          id: item.lesson_id || item.practice_id,
          timestamp: timestamp,
          duration: item.duration,
          noteId: note.note_id,
          noteContent: note.note_content,
        });
      });
    }
  });

  const learningFocusList = Object.keys(organizedData);

  return (
    <FlatList
      style={{ flexGrow: 0, flexShrink: 0 }}
      horizontal={true}
      data={learningFocusList}
      keyExtractor={(item) => item}
      renderItem={({ item: focus, index }) => (
        <Card
          style={{ margin: 2 }}
          mode={
            selectedLearningFocusList &&
            selectedLearningFocusList.index === index
              ? "outlined"
              : "contained"
          }
          onPress={() => handlePress(focus, index)}
        >
          <Card.Content>
            <Text variant="labelLarge">{focus}</Text>
            <Text variant="labelMedium">
              {formatDate(organizedData[focus][0].timestamp)}
            </Text>
          </Card.Content>
        </Card>
      )}
    />
  );
};
