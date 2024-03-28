import React, { useState, useContext } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Paragraph, Text, Title } from "react-native-paper";
import { commonStyles } from "../../styles/common-styles";
import PracticeCalendar from "../components/PracticeCalendar";
import PracticeCard from "../components/PracticeCard";
import { formatDate } from "../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign.js";
import { PracticeModalContext } from "../context/PracticeModalContext";
import { AppContext } from "../context/AppProvider";
import { LearningFocusList } from "../components/LearningFocusList";

export default PracticeScreen = () => {
  const { practises, loading } = useContext(AppContext);
  const { setPracticeModalIsVisible } = useContext(PracticeModalContext);
  const [selectedLearningFocusList, selectLearningFocusList] = useState(null);
  if (loading) return <Paragraph>Wait</Paragraph>;

  let previousDate = null;
  return (
    <SafeAreaView style={commonStyles.layout}>
      <Title>Last Practice</Title>
      <Text>
        {formatDate(practises[practises.length - 1].practice_timestamp)}
      </Text>
      <Title>Recent learning focus</Title>
      <LearningFocusList
        selectedLearningFocusList={selectedLearningFocusList}
        selectLearningFocusList={selectLearningFocusList}
      />
      <ScrollView>
        {!selectedLearningFocusList ? (
          <Text>No learning focus selected</Text>
        ) : (
          selectedLearningFocusList.list.map((note, index) => {
            const currentDate = new Date(note.timestamp).toDateString();
            const showDate = currentDate !== previousDate; // Check if it needs a new date title
            previousDate = currentDate;

            return (
              <View style={styles.day} key={index}>
                {showDate ? (
                  <Text variant="titleMedium" style={styles.date}>
                    {formatDate(note.timestamp)}
                  </Text>
                ) : null}
                <PracticeCard
                  notes={note.noteContent}
                  timestamp={note.timestamp}
                  duration={note.duration}
                  learningFocus={note.learning_focus}
                />
              </View>
            );
          })
        )}
        <View>
          <Title>Calendar</Title>
          <PracticeCalendar />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Icon
          name="pluscircle"
          size={54}
          color="tomato"
          onPress={() => setPracticeModalIsVisible(true)}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  date: {
    paddingBottom: 4,
    paddingTop: 16,
  },
});
