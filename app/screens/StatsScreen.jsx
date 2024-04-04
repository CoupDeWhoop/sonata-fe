import * as React from "react";
import { View, StyleSheet } from "react-native";
import PracticeCalendar from "../components/PracticeCalendar";
import { commonStyles } from "../../styles/common-styles.js";

const StatsScreen = () => {
  return (
    <View style={commonStyles.layout}>
      <View>
        <PracticeCalendar />
        <View style={styles.gridContainer}>
          <View
            style={[styles.gridItem, { backgroundColor: "#D0F0C0" }]}
          ></View>
          <View
            style={[styles.gridItem, { backgroundColor: "#B9D9EB" }]}
          ></View>
          <View
            style={[styles.gridItem, { backgroundColor: "#FCE4EC" }]}
          ></View>
          <View
            style={[styles.gridItem, { backgroundColor: "#F3E38B" }]}
          ></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  gridItem: {
    width: "48%",
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
  },
});

export default StatsScreen;
