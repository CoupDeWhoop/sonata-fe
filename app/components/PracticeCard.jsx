import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { formatDate } from "../utils";

export default PracticeCard = (props) => {
  return (
    <View style={styles.layout}>
      <Card>
        <Card.Title
          title="Practice"
          // subtitle={`${props.duration} min`}
          left={(props) => <Avatar.Icon {...props} icon="bugle" />}
          right={() => <Text>{formatDate(props.timestamp)}</Text>}
          rightStyle={{ paddingRight: 16 }}
        />
        <Card.Content>
          <Text variant="labelMedium">{props.learningFocus}</Text>
          <Text>{props.notes}</Text>
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
