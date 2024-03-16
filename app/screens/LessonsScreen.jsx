import React, { useState, useEffect, useContext } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity  } from 'react-native';
import { Avatar, Card, Modal, Portal, Text, PaperProvider } from 'react-native-paper';
import { getLessons, postLesson } from '../utils/apiCalls.js';
import { LessonModalContext } from '../context/LessonModalContext.jsx';
import { LearningFocusList } from '../components/LearningFocusList.jsx';
import AddLesson from './AddLesson.jsx';
import Loading from '../components/Loading.jsx'
import TextInputBox from '../components/TextInputBox.jsx';
import Icon from 'react-native-vector-icons/AntDesign.js';

const LessonsScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
  }, [lessons]);


  if (loading) return <Loading />;


  return (
    <PaperProvider>
      <View style={styles.screenContainer}>
        <Text variant='titleMedium' style={styles.heading}>Recent lesson focus points</Text>
        <LearningFocusList lessons={lessons} />
        <TextInputBox />
        <FlatList
          contentContainerStyle={{ marginTop: 16 }}
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
          <TouchableOpacity style={styles.addButton} >
            <Icon name="pluscircle" size={54} color="tomato" onPress={showModal}/>
          </TouchableOpacity>
      </View>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
        <AddLesson setVisible={setVisible}/>
      </Modal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  heading: {
    paddingBottom: 8,
    paddingLeft: 4,
  },
  card: {
    margin: 2,
    marginBottom: 16,
    backgroundColor: 'white'
  },
  addButton: {
    zIndex: 9,
    position: 'absolute',
    bottom: 8,
    right: 16
  },
  modalContainer: {
    backgroundColor: 'white', 
    padding: 20
  }
});

export default LessonsScreen;