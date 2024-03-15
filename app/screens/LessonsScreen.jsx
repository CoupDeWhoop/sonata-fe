import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity  } from 'react-native';
import { Avatar, Card, Text } from 'react-native-paper';
import { getLessons, postLesson } from '../../utils/api';
import { LessonModalContext } from '../context/LessonModalContext.jsx';
import { LearningFocusList } from '../components/LearningFocusList.jsx';
import Loading from '../components/Loading.jsx'
import TextInputBox from '../components/TextInputBox.jsx';

const LessonsScreen = () => {
  const { 
    lessonModalIsVisible, setLessonModalIsVisible, 
    lessons, setLessons, 
    newLesson, setNewLesson
  } = useContext(LessonModalContext);

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


  if (loading) return <Loading />;


    


  return (
    <View style={styles.screenContainer}>
      <Text variant='titleMedium' style={styles.heading}>Recent lesson focus points</Text>
      <LearningFocusList lessons={lessons} />
      <TextInputBox />
      <FlatList 
        contentContainerStyle={{marginTop:16}}
        data={lessons}
        keyExtractor={(item) => item.lesson_id}
        renderItem={( {item }) => (
          <Card style={styles.card}>
          <Card.Title
              title="Lesson"
              subtitle={`${item.duration} min`}
              left={(props) => <Avatar.Icon {...props} icon="bugle" backgroundColor='pink'/>}
              right={() => <Text>{new Date(item.lesson_timestamp).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })}</Text>}
              rightStyle={{paddingRight: 16}}
          />
      </Card>
          )}
      />
      

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
    backgroundColor: 'white'
  }
});

export default LessonsScreen;