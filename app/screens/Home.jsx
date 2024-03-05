import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, List } from 'react-native-paper';
import { configureAxiosHeader, getLessons, refreshTokens, setTokens } from '../../utils/api';

const LeftContent = props => <Avatar.Icon {...props} icon="bugle" />;

const Home = () => {
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

  if (loading) return <Text>Wait</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.lesson_id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={`Lesson ${item.lesson_id}`}
              subtitle={new Date(item.lesson_timestamp).toLocaleDateString()}
              left={LeftContent}
            />
            <Card.Content>
              <Title>Brass Lesson</Title>
              <List.Section>
                <List.Subheader>Some title</List.Subheader>
                {
                    item.notes.map((note) => (<List.Item key={note.note_id} title={note.learning_focus} left={() => <List.Icon icon="folder" />} />))
                }
            </List.Section>

              
            </Card.Content>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default Home;