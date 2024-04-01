import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Paragraph, Text, Title } from "react-native-paper";
import { commonStyles } from "../../styles/common-styles";
import PracticeCalendar from "../components/PracticeCalendar";
import NoteCard from "../components/NoteCard";
import { formatDate, getAllNotes } from "../utils";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign.js";
import { PracticeModalContext } from "../context/PracticeModalContext";
import { AppContext } from "../context/AppProvider";
import { LearningFocusList } from "../components/LearningFocusList";
import Loading from "../components/Loading";

export default PracticeScreen = () => {
  const { practises, loading } = useContext(AppContext);
  const { setPracticeModalIsVisible } = useContext(PracticeModalContext);
  const [learningFocusList, setLearningFocusList] = useState(null);
  const [practiceNotes, setPracticeNotes] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await getAllNotes();
        setAllNotes(result);
        setLoadingNotes(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  if (loadingNotes) return <Text>Loading notes</Text>;

  let previousDate = null;

  return (
    <SafeAreaView style={commonStyles.layout}>
      <Title>Last Practice</Title>
      <Text>
        {formatDate(practises[practises.length - 1].practice_timestamp)}
      </Text>
      <Title>Recent learning focus</Title>
      <LearningFocusList
        learningFocusList={learningFocusList}
        setLearningFocusList={setLearningFocusList}
        allNotes={allNotes}
      />
      {practiceNotes && (
        <ScrollView>
          {!learningFocusList
            ? allNotes.map((note, index) => {
                const timestamp =
                  note.practice_timestamp || note.lesson_timestamp;

                const currentDate = new Date(timestamp).toDateString();
                const showDate = currentDate !== previousDate;
                previousDate = currentDate;

                return (
                  <View key={index}>
                    {showDate && (
                      <Text variant="titleMedium" style={styles.date}>
                        {formatDate(timestamp)}
                      </Text>
                    )}
                    <NoteCard
                      note_content={note.note_content}
                      timestamp={timestamp}
                      learning_focus={note.learning_focus}
                      lesson_id={note.lesson_id}
                      practice_id={note.practice_id}
                    />
                  </View>
                );
              })
            : learningFocusList.list.map((note, index) => {
                const timestamp =
                  note.practice_timestamp || note.lesson_timestamp;
                const currentDate = new Date(timestamp).toDateString();
                const showDate = currentDate !== previousDate; // Check if it needs a new date title
                previousDate = currentDate;

                return (
                  <View style={styles.day} key={index}>
                    {showDate ? (
                      <Text variant="titleMedium" style={styles.date}>
                        {formatDate(timestamp)}
                      </Text>
                    ) : null}
                    <NoteCard
                      note_content={note.note_content}
                      timestamp={timestamp}
                      learning_focus={note.learning_focus}
                      lesson_id={note.lesson_id}
                      practice_id={note.practice_id}
                    />
                  </View>
                );
              })}
          <View>
            <Title>Calendar</Title>
            <PracticeCalendar />
          </View>
        </ScrollView>
      )}
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
