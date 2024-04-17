import React, { useContext } from "react";
import { View } from "react-native";
import { AppContext } from "../../context/AppProvider";
import HeatMap from "@uiw/react-heat-map";
import Loading from "../Loading";

const exampleValues = [
  { date: "2016/01/11", count: 2 },
  { date: "2016/01/13", count: 10 },
  ...[...Array(17)].map((_, idx) => ({
    date: `2016/02/${idx + 10}`,
    count: idx,
    content: "",
  })),
  { date: "2016/04/11", count: 2 },
  { date: "2016/05/04", count: 11 },
];

const PracticeCalendarWeb = () => {
  const { practises } = useContext(AppContext);
  if (!practises) return <Loading />;

  const practiceData = practises.reduce((datesObj, practice) => {
    const date = new Date(practice.practice_timestamp).toDateString();
    if (!datesObj[date]) {
      datesObj[date] = 1;
    } else {
      datesObj[date]++;
    }

    return datesObj;
  }, {});

  // todo: need to avoid having to iterate data again
  const formattedData = [];
  for (const date in practiceData) {
    formattedData.push({
      date: date,
      count: practiceData[date],
    });
  }
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  return (
    <View>
      <HeatMap
        value={formattedData}
        weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
        startDate={sixMonthsAgo}
      />
    </View>
  );
};

export default PracticeCalendarWeb;
