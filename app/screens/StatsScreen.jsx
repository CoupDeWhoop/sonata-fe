import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import PracticeCalendar from "../components/stats/PracticeCalendar.jsx";
import { commonStyles } from "../../styles/common-styles.js";
import StatsCard from "../components/stats/StatsCard.jsx";
import { AppContext } from "../context/AppProvider.jsx";
import Loading from "../components/Loading.jsx";

function calculateLongestStreak() {
  let currentStreak = 0;
  let longestStreak = 0;
  let previousDate = null;
  let streakEnd = null;

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
    if (longestStreak > currentStreak) {
      streakEnd = practiceDate;
    }
    previousDate = practiceDate;
  }
  return [longestStreak, streakEnd];
}

function getComparableDay(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-indexed
  const day = date.getDate();
  return year * 10000 + month * 100 + day;
}

const StatsScreen = () => {
  const { practises } = useContext(AppContext);

  if (!practises) return <Loading />;

  const totalPracticeinMins = practises.reduce((acc, curr) => {
    return (acc += curr.duration);
  }, 0);

  const totalSessions = practises.length;
  let averageLength = 0;
  let totalToDisplay = "None yet!";
  let streakToDisplay = "0 days";

  if (totalPracticeinMins > 0 && totalPracticeinMins < 60) {
    totalToDisplay = `${totalPracticeinMins} mins`;
  } else if (totalPracticeinMins > 60) {
    totalToDisplay = Math.round(totalPracticeinMins / 30) / 2; // to nearest half hour
  }

  if (totalSessions > 0) {
    averageLength = Math.round(totalPracticeinMins / totalSessions);
    const [streak, streakEnd] = calculateLongestStreak();

    const streakEndMonth = new Date(streakEnd).toLocaleString("en-GB", {
      month: "short",
      year: "2-digit",
    });

    streakToDisplay = `${streak} ${streak > 0 ? "day" : ""}${
      streak > 1 ? "s" : ""
    } ${streak > 0 ? streakEndMonth : ""}`;
  }

  return (
    <View style={commonStyles.layout}>
      <View>
        <PracticeCalendar />
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#D0F0C0"}
              icon={"timer"}
              title={<Text>{totalToDisplay}</Text>}
              text={<Text>{"Total practice"}</Text>}
            />
          </View>
          <View style={styles.gridItem}>
            <StatsCard
              color={"#B9D9EB"}
              icon={"counter"}
              title={`${totalSessions}`}
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
              title={streakToDisplay}
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
