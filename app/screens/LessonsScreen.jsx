import React, { useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity  } from 'react-native';
import { Avatar, Card, Modal, Text, PaperProvider } from 'react-native-paper';
import { LearningFocusList } from '../components/LearningFocusList.jsx';
import AddLesson from './AddLesson.jsx';
import Loading from '../components/Loading.jsx'
import Icon from 'react-native-vector-icons/AntDesign.js';
import { formatDate } from '../utils/dateUtils.js';

const LessonsScreen = ({ navigation, lessons, setNewLesson, selectLesson, loading }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  if (loading) return <Loading />;

  return (
    <PaperProvider>
      <View style={styles.screenContainer}>
        <Text variant='titleMedium' style={styles.heading}>Recent lesson focus points</Text>
        <LearningFocusList lessons={lessons} />
        <FlatList
          contentContainerStyle={{ marginTop: 16, paddingBottom: 24 }}
          data={lessons}
          keyExtractor={(item) => item.lesson_id}
          renderItem={( {item }) => (
            <View>
              <Text variant='titleMedium' style={styles.heading}>{`${formatDate(item.lesson_timestamp)}`}</Text>
              <Card style={styles.card}
                onPress={() => {
                  selectLesson(item)
                  navigation.navigate('Lesson Details')} 
                }
              >
              <Card.Title
                  title="Lesson"
                  subtitle={`${item.duration} min`}
                  left={(props) => <Avatar.Icon {...props} icon="bugle" backgroundColor='pink'/>}
                  right={() => <Text>{new Date(item.lesson_timestamp).toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' })}</Text>}
                  rightStyle={{paddingRight: 16}}
              />
            </Card>
            </View>
            )}
        />
        <TouchableOpacity style={styles.addButton} >
          <Icon name="pluscircle" size={54} color="tomato" onPress={showModal}/>
        </TouchableOpacity>
      </View>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
        <AddLesson setVisible={setVisible} setNewLesson={setNewLesson} />
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
    marginBottom: 8,
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