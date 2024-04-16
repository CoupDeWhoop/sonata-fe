import CalendarHeatmap from "react-native-range-responsive-calendar-heatmap";
import { ScrollView, View } from "react-native";
import { useContext, useRef, useEffect } from "react";
import { AppContext } from "../../context/AppProvider.jsx";

const PracticeCalendar = () => {
  const { practises } = useContext(AppContext);
  const formattedPracticeData = practises.map((practice) => {
    return { date: practice.practice_timestamp };
  });

  const scrollViewRef = useRef();

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({ animated: true, duration: 5000 });
  }, []);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      <CalendarHeatmap
        endDate={Date.now()}
        numDays={365}
        gutterSize={3}
        colorArray={["#FFF", "#D44B79", "#6B1928", "#9F3251", "#360000"]}
        values={formattedPracticeData}
        onPress={() => {}}
      />
    </ScrollView>
  );
};

export default PracticeCalendar;
