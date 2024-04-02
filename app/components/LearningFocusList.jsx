import { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import Loading from "./Loading";

export const LearningFocusList = ({
  learningFocusList,
  setLearningFocusList,
  allNotes,
}) => {
  const [learningTopics, setLearningTopics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const organiseNotes = () => {
      const result = allNotes.reduce((sortedNotes, curr) => {
        if (!sortedNotes[curr.learning_focus]) {
          sortedNotes[curr.learning_focus] = [];
        }
        sortedNotes[curr.learning_focus].push(curr);

        return sortedNotes;
      }, {});

      setLearningTopics(result);
      setIsLoading(false);
    };

    organiseNotes();
  }, [allNotes]);

  const handlePress = (focus, index) => {
    setLearningFocusList((currentFocus) => {
      if (currentFocus && currentFocus.index === index) {
        return null; // handles reclick on same item
      }
      return { list: learningTopics[focus], index }; // Return an object with both list and index
    });
  };

  if (isLoading) return <Loading />;

  return (
    <FlatList
      style={styles.container}
      horizontal={true}
      data={Object.keys(learningTopics)}
      keyExtractor={(item, index) => `${index}:${learningTopics[item].id}`}
      renderItem={({ item, index }) => (
        <Card
          style={styles.card}
          mode={
            learningFocusList && learningFocusList.index === index
              ? "outlined"
              : "contained"
          }
          onPress={() => handlePress(item, index)}
        >
          <Card.Content>
            <Text variant="labelLarge">{item}</Text>
            {/* <Text variant="labelMedium">{formatDate(item.timestamp)}</Text> */}
          </Card.Content>
        </Card>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    flexShrink: 0,
  },
  card: {
    margin: 2,
    backgroundColor: "#ffdae0",
  },
});
