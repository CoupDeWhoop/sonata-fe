import CalendarHeatmap from "react-native-range-responsive-calendar-heatmap";
import { ScrollView } from "react-native";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider.jsx";

export default PracticeCalendar = () => {
  const { practises } = useContext(AppContext);
  const formattedPracticeData = practises.map((practice) => {
    return { date: practice.practice_timestamp };
  });
  return (
    <ScrollView horizontal={true} contentContainerStyle={{ paddingLeft: 16 }}>
      <CalendarHeatmap
        endDate={Date.now()}
        numDays={80}
        colorArray={["#FCE4EC", "#D44B79", "#6B1928", "#9F3251", "#360000"]}
        values={formattedPracticeData}
      />
    </ScrollView>
  );
};
