import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Text, Paragraph, List } from 'react-native-paper';
import { configureAxiosHeader, getLessons, refreshTokens, setTokens } from '../../utils/api';

const LeftContent = props => <Avatar.Icon {...props} icon="bugle" />;

const HomeScreen = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const lessonsApiCall = async() => {
      try {
        const result = await getLessons();
        setLessons(result);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        if (error.response && error.response.status === 403) {
          try {
            const { tokens } = await refreshTokens();
            await setTokens(tokens.accessToken, tokens.refreshToken)
            configureAxiosHeader(tokens.accessToken)

            const result = await getLessons();
            setLessons(result);
            setLoading(false);
          } catch (refreshError) {
            console.error('Refresh token error:', refreshError.message);
            setLoading(false);
            setError(refreshError);
          }
        } else {
          setLoading(false);
          setError(error);
        }
      }
    };
    lessonsApiCall();
  }, []);

const LearningFocusCard = ({ learningFocus }) => (
  <Card style={styles.focusCard}>
    <Card.Content>
      <Text variant="titleLarge" >{learningFocus}</Text>
    </Card.Content>
  </Card>
)

  if (loading) return <Text>Wait</Text>;

  return (
    <View style={styles.screenContainer}>
      <Text variant='titleLarge'>Recent lesson focus points</Text>
      <FlatList 
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
    </View>

  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 16,
  },
  card: {
    margin: 2,
    marginBottom: 16,
  },
  focusCard: {
    margin: 2,
  }
});

export default HomeScreen;