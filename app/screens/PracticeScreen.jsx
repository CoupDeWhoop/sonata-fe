import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { commonStyles } from "../../styles/common-styles";
import { getAllNotes, postNewPractice } from "../utils";
import Icon from "react-native-vector-icons/AntDesign.js";
import { PracticeModalContext } from "../context/PracticeModalContext";
import LearningFocusList from "../components/LearningFocusList";
import NotesList from "../components/NotesList.jsx";
import Loading from "../components/Loading";

const PracticeScreen = () => {
  const { setPracticeModalIsVisible, newPractice, setNewPractice } =
    useContext(PracticeModalContext);
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
  }, [newPractice]);

  const handleListPress = (focus, learningTopics, index) => {
    setLearningFocusList((currentFocus) => {
      if (currentFocus && currentFocus.index === index) {
        return null; // handles reclick on same item
      }
      return { list: learningTopics[focus], index }; // Return an object with both list and index
    });
  };

  const handleNewPracticePress = async () => {
    try {
      const result = await postNewPractice(new Date().toISOString());
      setNewPractice(result);
      setPracticeModalIsVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <View style={commonStyles.layout}>
      <Text variant="titleMedium" style={styles.heading}>
        You have been working on ...
      </Text>
      <LearningFocusList
        learningFocusList={learningFocusList}
        allNotes={allNotes}
        handlePress={handleListPress}
      />
      <ScrollView>
        {!learningFocusList ? (
          <NotesList notes={allNotes} />
        ) : (
          <NotesList notes={learningFocusList.list} />
        )}
      </ScrollView>

      <IconButton
        style={styles.addButton}
        icon="plus-circle"
        iconColor="crimson"
        size={80}
        onPress={handleNewPracticePress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    paddingBottom: 4,
  },
  addButton: {
    zIndex: 9,
    position: "absolute",
    bottom: 8,
    right: 16,
  },
});

export default PracticeScreen;
