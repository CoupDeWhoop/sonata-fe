import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Title } from "react-native-paper";
import { commonStyles } from "../../styles/common-styles";
import PracticeCalendar from "../components/PracticeCalendar";
import { formatDate, getAllNotes } from "../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign.js";
import { PracticeModalContext } from "../context/PracticeModalContext";
import { LearningFocusList } from "../components/LearningFocusList";
import NotesList from "../components/NotesList";
import Loading from "../components/Loading";

export default PracticeScreen = () => {
  const { setPracticeModalIsVisible } = useContext(PracticeModalContext);
  const [learningFocusList, setLearningFocusList] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await getAllNotes();
        setAllNotes(result);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <SafeAreaView style={commonStyles.layout}>
      {/* <Title>Last Practice</Title>
      {
        <Text>
          {formatDate(
            allNotes.find((note) => note.practice_id).practice_timestamp
          )}
        </Text>
      } */}
      <Text variant="titleMedium" style={styles.heading}>
        You have been working on ...
      </Text>
      <LearningFocusList
        learningFocusList={learningFocusList}
        setLearningFocusList={setLearningFocusList}
        allNotes={allNotes}
      />
      <ScrollView>
        {!learningFocusList ? (
          <NotesList notes={allNotes} />
        ) : (
          <NotesList notes={learningFocusList.list} />
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
  heading: {
    paddingBottom: 4,
  },
  addButton: {},
});
