import * as React from "react";
import { View, StyleSheet } from "react-native";
import PracticeCalendar from "../components/stats/PracticeCalendar.jsx";
import { commonStyles } from "../../styles/common-styles.js";
import StatsCard from "../components/stats/StatsCard.jsx";

const StatsScreen = () => {
  return (
    <View style={commonStyles.layout}>
      <View>
        <PracticeCalendar />
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#D0F0C0"}
              icon={"timer"}
              title={"100 hours"}
              text={"Total practice"}
            />
          </View>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#B9D9EB"}
              icon={"counter"}
              title={"34"}
              text={"Total sessions"}
            />
          </View>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#FCE4EC"}
              icon={"ruler"}
              title={"40 mins"}
              text={"Average session"}
            />
          </View>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#F3E38B"}
              icon={"rocket-launch"}
              title={"10 days"}
              text={"Longest streak"}
            />
          </View>
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
  },
});

export default StatsScreen;
