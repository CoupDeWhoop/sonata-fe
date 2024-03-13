import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity  } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { getLessons } from '../../utils/api';
import { LessonModalContext } from '../context/LessonModalContext';

const LessonsScreen = () => {
  const { lessonModalIsVisible, setLessonModalIsVisible } = useContext(LessonModalContext);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const result = await getLessons();
        setLessons(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
  
    fetchLessons();
  }, []);

const LearningFocusCard = ({ learningFocus }) => (
  <Card style={styles.focusCard}>
    <Card.Content>
      <Text variant="labelLarge" >{learningFocus}</Text>
    </Card.Content>
  </Card>
)

  if (loading) return <Text>Wait</Text>;

  return (
    <View style={styles.screenContainer}>
      <Text variant='titleMedium' style={styles.heading}>Recent lesson focus points</Text>
      <FlatList 
        style={{flexGrow: 0}}
        horizontal={true}
        data={lessons}
        keyExtractor={(item) => item.lesson_id}
        renderItem={( {item }) => item.notes.map((note) => <LearningFocusCard key={note.note_id}learningFocus={note.learning_focus} />)}
      />
      <FlatList 
        contentContainerStyle={{marginTop:16}}
        data={lessons}
        keyExtractor={(item) => item.lesson_id}
        renderItem={( {item }) => (
          <Card style={styles.card}>
          <Card.Title
              title="Lesson"
              subtitle={`${item.duration} min`}
              left={(props) => <Avatar.Icon {...props} icon="bugle" />}
              right={() => <Text>{new Date(item.lesson_timestamp).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })}</Text>}
              rightStyle={{paddingRight: 16}}
          />
      </Card>
          )}
      />
      <TouchableOpacity 
        style={{ 
            borderWidth: 1, 
            borderColor: '#000066', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: 70, 
            position: 'absolute', 
            bottom: 20, 
            right: 20, 
            height: 70, 
            backgroundColor: '#000066', 
            borderRadius: 100, 
        }} 
        onPress={() =>  setLessonModalIsVisible(true)}
      > 
        <Text style={{ color: "white", fontSize: 24 }}>+</Text>

      </TouchableOpacity> 

    </View>

  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  heading: {
    paddingBottom: 8,
    paddingLeft: 4
  },
  card: {
    margin: 2,
    marginBottom: 16,
  },
  focusCard: {
    margin: 2,
  }
});

export default LessonsScreen;