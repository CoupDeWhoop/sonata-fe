import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { commonStyles } from "../../styles/common-styles";
import { getAllNotes, postNewPractice } from "../utils";
import Icon from "react-native-vector-icons/AntDesign.js";
import { PracticeModalContext } from "../context/PracticeModalContext";
import { LearningFocusList } from "../components/LearningFocusList";
import NotesList from "../components/NotesList";
import Loading from "../components/Loading";

export default PracticeScreen = () => {
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
      <TouchableOpacity style={styles.addButton}>
        <Icon
          name="pluscircle"
          size={54}
          color="tomato"
          onPress={handleNewPracticePress}
        />
      </TouchableOpacity>
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
    bottom: 24,
    right: 54,
  },
});
