import react, { useState, useContext, useEffect } from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import { AppContext } from "../context/AppProvider";
import { formatDate } from "../utils";
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
      style={{ flexGrow: 0, flexShrink: 0 }}
      horizontal={true}
      data={Object.keys(learningTopics)}
      keyExtractor={(item, index) => `${index}:${learningTopics[item].id}`}
      renderItem={({ item, index }) => (
        <Card
          style={{ margin: 2 }}
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
