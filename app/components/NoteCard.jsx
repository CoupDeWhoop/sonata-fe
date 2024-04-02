import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

const NoteCard = ({ timestamp, lesson_id, learning_focus, note_content }) => {
  return (
    <View style={styles.layout}>
      <Card
        style={{
          backgroundColor: lesson_id ? "#D0F0C0" : "#B9D9EB",
        }}
      >
        <Card.Title
          title={learning_focus}
          right={(props) => (
            <View style={styles.iconContainer}>
              <Text style={styles.rightText}>
                {lesson_id ? "Lesson" : "Practice"}
              </Text>
              <Avatar.Icon
                {...props}
                icon="bugle"
                size={32}
                style={styles.icon}
                backgroundColor="pink"
              />
            </View>
          )}
          rightStyle={styles.rightContainer}
        />
        <Card.Content>
          <Text>{note_content}</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    margin: 4,
  },
  rightContainer: {
    marginRight: 12,
  },
  iconContainer: {
    flexDirection: "row",
  },
  rightText: {
    paddingTop: 6,
  },
  icon: {
    marginLeft: 10,
  },
});

export default NoteCard;
