import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { formatDate } from "../utils";

export default NoteCard = ({
  timestamp,
  lesson_id,
  learning_focus,
  note_content,
}) => {
  return (
    <View style={styles.layout}>
      <Card
        style={{
          backgroundColor: lesson_id ? "#D0F0C0" : "#B9D9EB",
        }}
      >
        <Card.Title
          title={lesson_id ? "Lesson" : "Practice"}
          // subtitle={`${props.duration} min`}
          left={(props) => (
            <Avatar.Icon {...props} icon="bugle" backgroundColor="pink" />
          )}
          right={() => <Text>{formatDate(timestamp)}</Text>}
          rightStyle={{ paddingRight: 16 }}
        />
        <Card.Content>
          <Text variant="headlineSmall">{learning_focus}</Text>
          <Text>{note_content}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    margin: 2,
  },
  date: {
    paddingBottom: 8,
  },
});
