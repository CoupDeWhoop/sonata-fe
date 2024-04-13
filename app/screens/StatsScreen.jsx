import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import PracticeCalendar from "../components/stats/PracticeCalendar.jsx";
import { commonStyles } from "../../styles/common-styles.js";
import StatsCard from "../components/stats/StatsCard.jsx";
import { AppContext } from "../context/AppProvider.jsx";

const StatsScreen = () => {
  const { practises } = useContext(AppContext);
  const totalPracticeinMins = practises.reduce((acc, curr) => {
    return (acc += curr.duration);
  }, 0);

  const totalToNearestHalfHour = Math.round(totalPracticeinMins / 30) / 2;

  const totalSessions = practises.length;

  const averageLength = Math.round(totalPracticeinMins / totalSessions);

  function getComparableDay(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-indexed
    const day = date.getDate();
    return year * 10000 + month * 100 + day;
  }

  function calculateLongestStreak() {
    let currentStreak = 0;
    let longestStreak = 0;
    let previousDate = null;

    for (const practice of practises) {
      const practiceDate = getComparableDay(practice.practice_timestamp);

      if (previousDate && practiceDate - previousDate > 1) {
        // more than a day
        currentStreak = 0;
      } else if (previousDate && practiceDate != previousDate) {
        // only increment if not the same day
        currentStreak++;
      }

      longestStreak = Math.max(longestStreak, currentStreak);

      previousDate = practiceDate;
    }
    return longestStreak;
  }

  const streak = calculateLongestStreak();

  return (
    <View style={commonStyles.layout}>
      <View>
        <PracticeCalendar />
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#D0F0C0"}
              icon={"timer"}
              title={`${totalToNearestHalfHour} hours`}
              text={"Total practice"}
            />
          </View>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#B9D9EB"}
              icon={"counter"}
              title={totalSessions}
              text={"Total sessions"}
            />
          </View>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#FCE4EC"}
              icon={"ruler"}
              title={`${averageLength} mins`}
              text={"Average session"}
            />
          </View>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#F3E38B"}
              icon={"rocket-launch"}
              title={`${streak} day${streak > 1 ? "s" : ""}`}
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
